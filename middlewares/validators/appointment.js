import { checkSchema } from "express-validator";
import moment from "moment";

const today = moment().startOf('day');
const twoWeeksFromNow = moment().add(2, 'weeks').startOf('day');

export default {
    dateTime: checkSchema({
        day: {
            exists: {
                errorMessage: "Please enter the day of appointment"
            },
            custom: {
                options: (value) => {
                    const pattern = new RegExp("[0-9]{2}-[0-9]{2}-[0-9]{4}");
                    const selectedDate = moment(value, "DD-MM-YYYY");
                    if (!(selectedDate.isValid() && pattern.test(value))) {
                    throw new Error('Invalid date format, please provide in DD-MM-YYYY');
                    }
                    if (!selectedDate.isBetween(today, twoWeeksFromNow, 'day', '[]')) {
                    throw new Error('Day must be between today and two weeks from now');
                    }
                    return true;
                }
            }
        },
        timeStart: {
            exists: {
                errorMessage: "Please enter the time of appointment"
            },
            isInt: {
                errorMessage: "Time must be a number between 10 and 18",
                options: {
                    min: 10,
                    max: 18
                }
            }
            
        }
    })
}