# Zednationmusic — READY Firebase package

Your Firebase Web App configuration is already inserted.

## Upload to GitHub
Upload all files to the ROOT of your GitHub Pages repository:
- index.html
- admin.html
- app.js
- admin.js
- firebase-config.js
- style.css
- firestore.rules
- storage.rules
- robots.txt
- sitemap.xml

## One-time Firebase setup
The website code is ready, but Firebase must have these services enabled:

1. Authentication → Sign-in method → Email/Password → Enable.
2. Authentication → Users → Add user. Create the email/password you will use for the admin page.
3. Firestore Database → Create database.
4. Storage → Get started.
5. Firestore Rules → paste firestore.rules and publish.
6. Storage Rules → paste storage.rules and publish.

## Make your account an admin
After creating the admin user, copy the user's UID from Firebase Authentication.

In Firestore, create a collection named:
adminUsers

Create a document whose Document ID is exactly that user's UID.

You can leave the document empty.

This is important: the security rules only allow users listed in adminUsers to upload/delete music or read messages.

## Upload music
Open:
YOUR-GITHUB-PAGES-URL/admin.html

Log in with the Firebase admin account and upload your MP3/audio file.

The audio is stored in Firebase Storage and the song information is stored in Firestore. It then appears automatically on the public music page.

## Google
The package includes robots.txt and sitemap.xml. Before submitting the sitemap, replace the placeholder GitHub Pages address in both files with your actual site address.

Then use Google Search Console to submit the sitemap and request indexing. Google decides when the page appears in search results; indexing is not guaranteed to be immediate.

## Security note
The Firebase Web API key in firebase-config.js is a client-side identifier, not a password. Security comes from Firebase Authentication and Security Rules. Never put an admin password or private service-account key in the website files.
