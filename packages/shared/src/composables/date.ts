import * as dayjs from "dayjs";
import * as localizedFormat from "dayjs/plugin/localizedFormat";
import * as objectSupport from "dayjs/plugin/objectSupport";
import * as timezone from "dayjs/plugin/timezone";
import * as utc from "dayjs/plugin/utc"; // dependent on utc plugin

import "dayjs/locale/en";
import "dayjs/locale/zh";
import "dayjs/locale/zh-cn";

dayjs.extend(localizedFormat);
dayjs.extend(objectSupport);
dayjs.extend(utc);
dayjs.extend(timezone);

export interface DateOptions {
  /**
   * @default 'en'
   */
  lang?: string;
  timezone?: string;
  /**
   * @default 'full'
   */
  type?: "date" | "time" | "full";
}

export interface DateDetail {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

export interface DateInfo {
  display: string;
  value: Date | undefined;
  detail: Partial<DateDetail>;
}

const getLang = (lang = "en"): string => {
  const langcode = lang.toLowerCase();

  return langcode === "en-us" || langcode === "en-uk" ? "en" : langcode;
};

export const timeTransformer = (
  date: Date,
  option: DateOptions = {}
): string => {
  const { lang, timezone, type } = option;
  dayjs.locale(getLang(lang));

  const dateText = timezone
    ? dayjs(date).tz(timezone).format("LL")
    : dayjs(date).format("LL");

  const timeText = timezone
    ? dayjs(date).tz(timezone).format("HH:mm")
    : dayjs(date).format("HH:mm");

  return type === "date"
    ? dateText
    : type === "time"
    ? timeText
    : `${dateText} ${timeText}`;
};

export const getDate = (
  date: string | Date | undefined,
  options?: DateOptions
): DateInfo | null => {
  if (date) {
    const time = dayjs(date instanceof Date ? date : date.trim());

    if (time.isValid()) {
      const year = time.year();
      const month = time.month() + 1;
      const day = time.date();
      const hour = time.hour();
      const minute = time.minute();
      const second = time.second();
      const millisecond = time.millisecond();
      const isDate =
        hour === 0 && minute === 0 && second === 0 && millisecond === 0;
      const value = time.toDate();

      return {
        display: timeTransformer(value, {
          type: isDate ? "date" : "full",
          ...options,
        }),
        value,
        detail: {
          year,
          month,
          day,
          ...(isDate ? {} : { hour, minute, second }),
        },
      };
    }

    const timeRegPattern = /(?:(\d+)[/-](\d+)[/-](\d+))?\s*(?:(\d+):(\d+)(?::(\d+))?)?/u;
    const result = timeRegPattern.exec((date as string).trim());

    if (result) {
      const [, year, month, day, hour, minute, second] = result;

      const getNumber = (a: string | undefined): number | undefined =>
        typeof a === "undefined" ? undefined : Number(a);

      const getYear = (yearNumber: number | undefined): number | undefined =>
        yearNumber && yearNumber < 100 ? yearNumber + 2000 : yearNumber;

      const getSecond = (
        secondNumber: number | undefined
      ): number | undefined => (hour && minute && !second ? 0 : secondNumber);

      const detail = {
        year: getYear(getNumber(year)),
        month: getNumber(month),
        day: getNumber(day),
        hour: getNumber(hour),
        minute: getNumber(minute),
        second: getSecond(getNumber(second)),
      };

      const isTime =
        year === undefined && month === undefined && day === undefined;
      const isDate =
        hour === undefined && minute === undefined && second === undefined;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const value = dayjs({ ...detail, month: detail.month - 1 }).toDate();

      return {
        display: timeTransformer(value, {
          type: isDate ? "date" : isTime ? "time" : "full",
          ...options,
        }),
        value: isTime ? undefined : value,
        detail: isDate
          ? { year: detail.year, month: detail.month, day: detail.day }
          : isTime
          ? { hour: detail.hour, minute: detail.minute, second: detail.second }
          : detail,
      };
    }
  }

  return null;
};
