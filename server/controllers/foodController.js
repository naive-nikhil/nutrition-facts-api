const Food = require('../models/Food');

// Get all food items with pagination, filtering and sorting
exports.getFoods = async (req, res)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        // Filtering
        let filter = {};

        // Search by name
        if(req.query.search){
            filter.name = {$regex: req.query.search, $options: 'i'};
        }

        // Filter by GI range
        if(req.query.minGI){
            filter.glycemicIndex = {...filter.glycemicIndex, $gte: parseInt(req.query.minGI)};
        }
        if(req.query.maxGI){
            filter.glycemicIndex = {...filter.glycemicIndex, $lte: parseInt(req.query.maxGI)};
        }

        // Filter by category
        if(req.query.category){
            filter.category = req.category;
        }

        // Sorting
        const sort = {};
        if(req.query.sortBy){
            // Format should be "field:direction", e.g., "glycemicIndex:desc"
            const [field, direction] = req.query.sortBy.split(':');
            sort[field] = direction === 'desc' ? -1 : 1;
        }else{
            // Default sort by name ascending
            sort.name = 1;
        }

        // Execute query with pagination
        const foods = await Food.find(filter).sort(sort).skip(skip).limit(limit);

        // Get total count for pagination info
        const totalFoods = await Food.countDocuments(filter);

        res.status(200).json({
            success: true,
            count: foods.length,
            total: totalFoods,
            totalPages: Math.ceil(totalFoods/limit),
            currentPage: page,
            data: foods
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get a single food item by ID
exports.getFoodById = async (req, res)=>{
    try {
        const food = await Food.findById(req.params.id);

        if(!food){
            return res.status(404).json({
                success: false,
                error: 'Food item not found'
            });
        }

        res.status(200).json({
            success: true,
            data: food
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}