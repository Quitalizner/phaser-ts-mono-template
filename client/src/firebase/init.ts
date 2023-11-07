// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.warn('is stage', process.env.IS_STAGE);
let firebaseConfig: any;
if (process.env.NODE_ENV === 'development' || process.env.IS_STAGE === 'true') {
	console.warn('stage config');
	firebaseConfig = {};
} else {
	console.warn('prod config');
	firebaseConfig = {};
}

export function initFirebase() {
	// Initialize Firebase
	if (!firebaseConfig) {
		console.error('firebase config not found');
		return;
	}
	// const app = initializeApp(firebaseConfig);
	// const auth = getAuth();
	// const analytics = getAnalytics(app);
	// const functions = getFunctions(app, 'us-central1');
	// const db = getDatabase(app);
	// if (process.env.NODE_ENV === 'development' && process.env.IS_STAGE === 'false') {
	// 	connectAuthEmulator(auth, 'http://localhost:9099');
	// 	connectFunctionsEmulator(functions, 'localhost', 5001);
	// 	connectDatabaseEmulator(db, 'localhost', 9000);
	// }
}
