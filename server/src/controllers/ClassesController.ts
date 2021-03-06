import { Request, Response } from 'express';
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

class ClassController {
  async index(request: Request, response: Response): Promise<Response> {
    const filters = request.query;
    if (!filters.week_day || !filters.subject || !filters.time) {
      return response
        .status(400)
        .json({ message: 'Missing filters to search classes.' });
    }

    const subject = filters.subject as string;
    const time = filters.time as string;
    const week_day = filters.week_day as string;

    const timeInMinutes = convertHourToMinutes(time);
    const classes = await db('classes')
      .whereExists(function () {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]);
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'user_id')
      .select(['classes.*', 'users.*']);

    return response.json(classes);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    } = request.body;

    const trx = await db.transaction();

    try {
      const [user_id] = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
      });
      const [class_id] = await trx('classes').insert({
        user_id,
        subject,
        cost,
      });

      const classSchedule = schedule.map((item: ScheduleItem) => {
        return {
          week_day: item.week_day,
          from: convertHourToMinutes(item.from),
          to: convertHourToMinutes(item.to),
          class_id,
        };
      });
      await trx('class_schedule').insert(classSchedule);
      await trx.commit();

      return response.status(201).send();
    } catch (error) {
      await trx.rollback();
      return response.status(400).json({
        message: 'Unexpected error while creating new class',
        innerMessage: error.message,
      });
    }
  }
}

export default new ClassController();
