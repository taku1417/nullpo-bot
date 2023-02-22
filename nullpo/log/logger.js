function logger(logtype){//コンソールにログを出力する用
        all_log = all_log + 1;
        const Month = new Date().getMonth()+1,Day = new Date().getDate(),Hour = new Date().getHours(),Min = new Date().getMinutes(),Sec = new Date().getSeconds(),MilliSec = new Date().getMilliseconds(),Hour0 = ('0' + Hour).slice(-2),Min0 = ('0' + Min).slice(-2),Sec0 = ('0' + Sec).slice(-2),MilliSec0 = ('00' + MilliSec).slice(-3);
        switch(logtype){
                case "join":
                        join_log = join_log + 1;
                        break;
                case "move":
                        move_log = move_log + 1;
                        break;
                case "leave":
                        leave_log = leave_log + 1;
                        break;
                case "clock":
                        clock_log = clock_log + 1;
                        break;
                case "restart":
                        restart_log = restart_log + 1;
                        break;
                case "command":
                        command_log = command_log + 1;
                        break;
                case "delete":
                        delete_log = delete_log + 1;
                        break;
                default:
                        unknown_log = unknown_log + 1;
                        break;
        }
        console.log("[" + Month + "/" + Day + " " + Hour0 + ":" + Min0 + ":" + Sec0 + "." + MilliSec0 + "]  {%s}    " + 'all:%d,join:%d,move:%d,leave:%d,clock:%d,restart:%d,command:%d,delete:%d,unknown:%d',logtype,all_log,join_log,move_log,leave_log,clock_log,restart_log,command_log,delete_log,unknown_log);
}

module.exports = logger