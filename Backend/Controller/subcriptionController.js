const { response } = require('express');
const subscription = require('../Models/subscription');
const user = require("../Models/user");

const subscriptionAuth = async (req, res) => {
    const { email } = req.body
    console.log("email subs", req.body);
    const response = await subscription.findOne({ email });
    if (response) {
        const subscriptionsChecks = new Date(response.planEndDate);
        planEnd = subscriptionsChecks.getTime()
        if (new Date() > planEnd) {
            const subscriptionId = response[0].subscription[0]._id
            console.log(subscriptionId);
            const inActive = await subscription.findOneAndUpdate({ _id: subscriptionId }, {

                planStatus: 'inactive'

            })
            console.log(response);
            re
        }
        else {
            return res.status(200).json({
                msg: "ok",
                subscription: response
            })
        }
        console.log("active");
    }
};
// };

const checkSubscription = async (req, res) => {
    const {email}=req.body;
    console.log("my subscription")
    const response = await user.aggregate([
        {
            $match: { email: email }  // Match the current user by email
        },
        {
            $lookup: {
                from: 'subscriptions',
                localField: "email",
                foreignField: "planUserEmail",
                as: "subscription"
            },

        },
        {
            $unwind: {
                path: "$subscription",
                preserveNullAndEmptyArrays: true
            }
        }
    ])
    if(response){
        res.status(201).json({
            response
        })
    }
}

module.exports = {
    checkSubscription,
}