const Community = require('../models/Community');
const Member = require('../models/Member');
const { sendSuccess, sendError } = require('../utils/response');

async function getAllCommunities(req, res, next) {
  try {
    const communities = await Community.find().sort({ memberCount: -1 });
    return sendSuccess(res, communities, 'Communities fetched');
  } catch (err) {
    next(err);
  }
}

async function joinCommunity(req, res, next) {
  try {
    const { id: communityId } = req.params;
    const { memberId } = req.body;

    if (!memberId) {
      return sendError(res, 'Member ID is required', 400);
    }

    const community = await Community.findById(communityId);
    if (!community) {
      return sendError(res, 'Community not found', 404);
    }

    const member = await Member.findById(memberId);
    if (!member) {
      return sendError(res, 'Member not found', 404);
    }

    if (!member.communities.includes(communityId)) {
      member.communities.push(communityId);
      await member.save();
    }

    if (!community.members.includes(memberId)) {
      community.members.push(memberId);
      community.memberCount = community.members.length;
      await community.save();
    }

    return sendSuccess(res, { member, community }, `Successfully joined ${community.name}`);
  } catch (err) {
    next(err);
  }
}

async function leaveCommunity(req, res, next) {
  try {
    const { id: communityId } = req.params;
    const { memberId } = req.body;

    const member = await Member.findById(memberId);
    const community = await Community.findById(communityId);

    if (member) {
      member.communities = member.communities.filter(c => c.toString() !== communityId);
      await member.save();
    }

    if (community) {
      community.members = community.members.filter(m => m.toString() !== memberId);
      community.memberCount = community.members.length;
      await community.save();
    }

    return sendSuccess(res, { member, community }, `Left community ${community?.name}`);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllCommunities,
  joinCommunity,
  leaveCommunity
};

