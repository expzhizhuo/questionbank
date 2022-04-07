// ecosystem.config.js
module.exports = {
    apps: [{
        name: "zhizhuo-网课系统",//项目名称
        script: "./bin/www",//文件的启动目录
        env: {
            "ip": "127.0.0.1",//本地地址
            "NODE_ENV": "production"//node环境为生产模式
        },
        watch: true, //项目热部署，代码修改自动重启
        ignore_watch: [                           // 不用监听的文件
            "node_modules",
            "log"
        ],
        instances: 2, //配置项目为2线程，pm2自带负载均衡
        max_memory_restart: '300M',
        //节流控制
        min_uptime: '60s', //应用最小启动时间，小于这个时间为异常启动
        listen_timeout: 10000, //如果app没有发送ready信号，间隔多少时间重启reload（ms）
        autorestart: true,//开机自动重启，有问题自动重启
        //日志配置
        log_data_format: "YYYY-MM-DD HH:mm:ss", // 日志时间
        error_file: './log/error.log', //错误日志
        out_file: './log/out.log', //正常日志输出
        combine_logs: true, //是否将不同id的进程日志进行合并
        merge_logs: true,                         // 设置追加日志而不是新建日志
    }]
}

/*
如果想自动根据CPU的核心数启动线程的话使用命令
pm2 start ecosystem.config.js -i 0 #根据CPU核数启动进程个数
注释掉 instances: 2, //配置项目为2线程，pm2自带负载均衡
*/