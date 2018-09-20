const PollModel = require('../models/pollModel');

class PollController {

    //创建投票
    async create(ctx) {
        let reqBody = ctx.request.body;
        let pollObj = {
            title: reqBody.title,
            description: reqBody.description,
            creatorId: ctx.state.user.openId,
            anonymous: reqBody.anonymous,
            options: reqBody.options
        }
        let result = await PollModel.create(pollObj);
        if (!result) return ctx.error({ msg: '创建投票失败!' });
        return ctx.success({ msg: '创建投票成功!', data: result });
    };

    //参与投票
    async join(ctx) {

    }


    // 获取某个用户所有创建的投票
    async getAllPoll(ctx) {
        let query = ctx.request.query;
        let openId = query.openId;
        if (!openId) return ctx.error({ msg: '用户id不能为空' });
        const polls = await PollModel
            .find({ creatorId: openId });
        return ctx.success({ msg: '查询成功!', data: { polls: polls } });
    };

    // 获取某个用户单一创建的投票
    async getPoll(ctx) {
        let query = ctx.request.query;
        let openId = query.openId;
        let pollId = query.pollId;
        if (!openId) return ctx.error({ msg: '用户id不能为空' });
        const polls = await PollModel
            .find({ creatorId: openId, _id: pollId });
        return ctx.success({ msg: '查询成功!', data: { polls: polls } });
    };

    // 
}

module.exports = new PollController();