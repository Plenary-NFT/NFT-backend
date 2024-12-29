const NFTListing = require('../models/nftListing');

class NFTListingService {
    async createListing(data) {
        const listing = new NFTListing(data);
        return await listing.save();
    }

    async getListings() {
        return await NFTListing.find().populate('owner');
    }

    async getListingById(id) {
        return await NFTListing.findById(id).populate('owner');
    }

    async updateListing(id, data) {
        return await NFTListing.findByIdAndUpdate(id, data, { new: true }).populate('owner');
    }

    async deleteListing(id) {
        return await NFTListing.findByIdAndDelete(id);
    }

    async getListingsByOwner(ownerId) {
        return await NFTListing.find({ owner: ownerId }).populate('owner');
    }
}

module.exports = new NFTListingService();