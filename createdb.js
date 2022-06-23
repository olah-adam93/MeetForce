const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set, push } = require("firebase/database");

const firebaseConfig = {
  apiKey: 'AIzaSyA8Zyz9kUtUKVjhZm-w9W18wAV5LHPd3wI',
  authDomain: 'meet-force.firebaseapp.com',
  databaseURL: 'https://meet-force-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'meet-force',
  storageBucket: 'meet-force.appspot.com',
  messagingSenderId: '759835214615',
  appId: '1:759835214615:web:172a5c9793a0b876496d52',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const eventCategoriesEndpoint = "eventCategories";
const eventTypesEndpoint = "eventTypes";
// const eventsEndpoint = "events";
// const userDetailsEndpoint = "userDetails";
// const eventAttendeesEndpoint = "eventAttendees";

/* endpoint generált id-val */
function endPointWithId(endpoint, data) {
    const refEndpoint = ref(database, `${endpoint}`);
    const newRefEndpoint = push(refEndpoint);
    return set(newRefEndpoint, data);
}

// sima endpoint generált id nélkül
function endPointWithoutId(endpoint, data) {
    const refEndpoint = ref(database, `${endpoint}`);
    return set(refEndpoint, data);
}

endPointWithoutId(eventCategoriesEndpoint, {
        'business': 'Business and Professional',
        'charity': 'Charity',
        'community': 'Community or Culture',
        'family': 'Family',
        'education': 'Education',
        'fashion': 'Fashion or Beauty',
        'food-or-drink': 'Food or Drink',
        'health': 'Health',
        'music': 'Music',
        'religion': 'Religion',
        'science': 'Science and Technology',
        'holiday': 'Holiday',
        'sports': 'Sports',
        'travel': 'Travel',
        'other': 'Other'
}).then(() => console.log("eventCategories endpoint created"));

endPointWithoutId(eventTypesEndpoint, {
        'trip': 'Trip',
        'workshop': 'Workshop',
        'performance': 'Concer or Performance',
        'conference': 'Conference',
        'dinner': 'Dinner or Gala',
        'festival': 'Festival or Fair',
        'game': 'Game',
        'meeting': 'Meeting',
        'party': 'Party',
        'seminar': 'Seminar or Talk',
        'tournament': 'Tournament',
        'other': 'Other'
}).then(() => console.log("eventTypes endpoint created"));

