// channelController.js
const Channel = require('../model/channelListModel');
const mongoose = require('mongoose');

// Create a new channel
exports.createChannel = async (req, res) => {
    try {
        const { name, description } = req.body;
        const createdBy = req.user._id; // Assuming the authenticated user is stored in req.user
        const newChannel = await Channel.create({ name, description, createdBy });
        res.status(201).json({ channel: newChannel });
    } catch (error) {
        console.error('Error creating channel:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get list of channels
exports.getChannels = async (req, res) => {
    try {
        const channels = await Channel.find();
        res.json({ channels });
    } catch (error) {
        console.error('Error fetching channels:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get details of a specific channel
exports.getChannelDetails = async (req, res) => {
    try {
        const channelId = req.params.channelId;
        const channel = await Channel.findById(channelId);
        if (!channel) {
            return res.status(404).json({ error: 'Channel not found' });
        }
        res.json({ channel });
    } catch (error) {
        console.error('Error fetching channel details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete the channel with channelId
exports.deleteChannel = async (req, res) => {
    try {
        //get the channel id through requested url
        const channelId = req.params.channelId;
        const deletedChannel = await Channel.findByIdAndDelete(channelId);
        if(!deletedChannel){
            return res.status(404).json({error:'Channel not found with this id'})
        }
        res.json({message:'Channel deleted successfully'});

    } catch (error){
        console.error('Error while deleting channel:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Update the dechannel with channelId
exports.updateChannel = async (req, res) => {
    try {
        //get the channel id through requested url
        const channelId = req.params.channelId;
        if (!mongoose.Types.ObjectId.isValid(channelId)) {
            return res.status(400).json({ error: 'Invalid channel ID' });
        }
        const {name, description} = req.body;
        //find channel with id and update it
        const updatedChannel = await Channel.findByIdAndUpdate(channelId, {name, description}, {new: true});
        if(!updatedChannel){
            return res.status(404).json({error:'Channel not found with this id'})
        }
        res.json({message:'Channel updated successfully'});

    } catch (error){
        console.error('Error while updating channel:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

