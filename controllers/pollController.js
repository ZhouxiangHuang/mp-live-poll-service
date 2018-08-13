const PollModel = require('../models/pollModel');

class PollController {

    //创建投票
    async create(ctx) {

        let reqBody = ctx.request.body;
        let pollObj = {
            title: reqBody.title,
            description: reqBody.description,
            creatorId: reqBody.openID,
            anonymous: reqBody.anonymous,
            options: reqBody.options
        }
        let result = await PollModel.create(pollObj);
        if (!result) return ctx.error({
            msg: '创建投票失败!'
        });
        return ctx.success({
            msg: '创建投票成功!',
            data: result
        });
    };

    //参与投票
    async join(ctx) {

    }

}

module.exports = new PollController();