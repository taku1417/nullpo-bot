function nplogger(logtype){//コンソールにログを出力する用
        logger.trace("[Log] logger.js");
        all_log++;
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
        logger.info( " {%s}\n" + 'all:%d,join:%d,move:%d,leave:%d,clock:%d,restart:%d,command:%d,message:%d,unknown:%d',logtype,all_log,join_log,move_log,leave_log,clock_log,restart_log,command_log,message_log,unknown_log);
}

module.exports = nplogger