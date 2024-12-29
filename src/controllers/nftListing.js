const NFTListingService = require('../services/nftListing');

class NFTListingController {
    async create(req, res) {
        try {
            const data = {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                ipfsLink: req.body.ipfsLink,
                owner: req.user._id
            };
            const listing = await NFTListingService.createListing(data);
            res.status(201).json(listing);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const listings = await NFTListingService.getListings();
            res.status(200).json(listings);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getById(req, res) {
        try {
            const listing = await NFTListingService.getListingById(req.params.id);
            if (!listing) {
                return res.status(404).json({ message: 'NFT Listing not found' });
            }
            res.status(200).json(listing);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const listing = await NFTListingService.updateListing(req.params.id, req.body);
            if (!listing) {
                return res.status(404).json({ message: 'NFT Listing not found' });
            }
            res.status(200).json(listing);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const listing = await NFTListingService.deleteListing(req.params.id);
            if (!listing) {
                return res.status(404).json({ message: 'NFT Listing not found' });
            }
            res.status(200).json({ message: 'NFT Listing deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getByOwner(req, res) {
        try {
            const listings = await NFTListingService.getListingsByOwner(req.params.ownerId);
            res.status(200).json(listings);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new NFTListingController();