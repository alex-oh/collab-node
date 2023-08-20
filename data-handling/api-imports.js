import axios from 'axios';
import mongoose from 'mongoose';


const MONGODB_URI = 'mongodb+srv://krugert:ZIFQQxbMj7zC7Pmp@neu-collab-0.1oel9h6.mongodb.net/';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const apisSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: false },
    category: { type: String, required: false },
    link: { type: String, required: false },
    description: { type: String, required: false },
    cors: { type: String, required: false },
    auth: { type: String, required: false },
    https: { type: String, required: false },
    userFavorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: false
    }],
});

const ApiModel = mongoose.model('Apis', apisSchema, 'Apis');


(async () => {
    try {
        const response = await axios.get('https://api.publicapis.org/entries');
        const apis = response.data.entries;

        const transformedApis = apis.map(api => ({
            title: api.API,
            category: api.Category,
            link: api.Link,
            description: api.Description,
            cors: api.Cors,
            auth: api.Auth,
            https: api.HTTPS,
            userFavorites: []
        }));

        await ApiModel.insertMany(transformedApis);
        console.log('Data inserted successfully');
        mongoose.connection.close();

    } catch (error) {
        console.error('Error:', error);
    }
})();
