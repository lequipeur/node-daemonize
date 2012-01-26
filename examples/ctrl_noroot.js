
var daemon = require("daemonize").setup({
    main: "with_log.js",
    name: "sampleapp",
//    user: "www-data",
//    group: "www-data",
    pidfile: "./sampleapp.pid"
});

var x = require('fs').createWriteStream('./x.txt');

switch (process.argv[2]) {
    
    case "start": 
        daemon.start(function(err) {
            process.exit();
        });
        break;
    
    case "stop":
        daemon.stop();
        break;
    
    case "kill":
        daemon.kill();
        break;
    
    case "restart":
        daemon.stop(function(pid) {
            daemon.start(function(err) {
                process.exit();
            });
        });
        break;

    case "reload":
        daemon.sendSignal("SIGUSR1");
        break;

    case "status":
        daemon.status();
        break;
    
    default:
        console.log("Usage: [start|stop|kill|restart|status]");
}