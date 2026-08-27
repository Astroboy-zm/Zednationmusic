# Zednationmusic — Firebase + Cloudinary

This version removes Firebase Storage, so you do not need a Firebase billing card for MP3 storage.

Cloudinary currently offers a Free plan with no credit card required and supports upload APIs/widgets. It can accept direct browser uploads using an unsigned upload preset.

## Cloudinary setup
1. Create a free Cloudinary account.
2. Find your Cloud Name.
3. Go to Settings -> Upload -> Upload presets -> Add upload preset.
4. Set the preset to **Unsigned**.
5. Restrict it to the `zednationmusic/audio` folder and audio files/size limits where available.
6. Copy the preset name.
7. Put both values into `cloudinary-config.js`.

Do NOT put a Cloudinary API Secret in GitHub.

## Firebase
Keep your existing Firebase Authentication, Firestore, and adminUsers document.
Publish `firestore.rules` in Firestore Rules.

## Admin upload
After adding the Cloudinary values, upload these files to GitHub. Open `/admin.html`, log in with your Firebase admin account, choose an audio file, and upload it. The audio URL is saved in Firestore and displayed on the public music page.

## Important
Unsigned upload presets can be abused by anyone who discovers the preset name. Keep the preset restricted and monitor usage. For a larger production service, use signed server-side uploads.
