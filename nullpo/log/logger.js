function nplogger(logtype){//コンソールにログを出力する用
        all_log++;
        const Month = new Date().getMonth()+1,Day = new Date().getDate(),Hour = new Date().getHours(),Min = new Date().getMinutes(),Sec = new Date().getSeconds(),MilliSec = new Date().getMilliseconds(),Hour0 = ('0' + Hour).slice(-2),Min0 = ('0' + Min).slice(-2),Sec0 = ('0' + Sec).slice(-2),MilliSec0 = ('00' + MilliSec).slice(-3);
        switch(logtype){
                case "join":
                        join_log++;
                        break;
                case "move":
                        move_log++;
                        break;
                case "leave":
                        leave_log++;
                        break;
                case "clock":
                        clock_log++;
                        break;
                case "restart":
                        restart_log++;
                        break;
                case "command":
                        command_log++;
                        break;
                case "delete":
                case "edit":
                        message_log++;
                        break;
                default:
                        unknown_log++;
                        break;
        }
        logger.info("[" + Month + "/" + Day + " " + Hour0 + ":" + Min0 + ":" + Sec0 + "." + MilliSec0 + "]  {%s}    " + 'all:%d,join:%d,move:%d,leave:%d,clock:%d,restart:%d,command:%d,message:%d,unknown:%d',logtype,all_log,join_log,move_log,leave_log,clock_log,restart_log,command_log,message_log,unknown_log);
}

module.exports = nplogger