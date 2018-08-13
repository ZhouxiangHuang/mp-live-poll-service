class PollController {

    //创建投票
    async create(ctx) {
        await poll.save(function (error, doc) {
                if (error || !doc) {
                    resolve({
                        "success": false,
                        "message": '增加数据失败'
                    });
                } else {
                    resolve({
                        "success": true,
                        "message": '增加数据成功'
                    });
                }
            })
    }

    //参与投票
    async join(ctx) {

    }

}

module.exports = new PollController();