import dateFnsGenerateConfig from'rc-picker/lib/generate/dateFns';
import generateCalendar from 'antd/lib/calendar/generateCalendar';
import 'antd/lib/calendar/style';

const Calendar = generateCalendar(dateFnsGenerateConfig);

export default Calendar;