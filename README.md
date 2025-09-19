# Next_Template
This is a personal project based on Reactjs and Nextjs.<br>
Project internal services will be added on an ongoing basis.<br>
Please refer to the link below for development records and details
### Link
Deploy : [Vercel](https://next-template-alpha-ten.vercel.app) <br>
Blog : [Notion](https://nervous-piper-af7.notion.site/39217964f90746028a396f2829fed6a2?v=ee8667e0578548e4b05ed1fbe4af0bd8&p=631cae7ca1084844b5405a4bc3230baf&pm=c)
### Version
- 0.1.0 <br>
Develop and Deploy 'MoviePage' <br>
You can use the TMDB API to search and view movie information. <br>
You can search for and view movie information, and check related details <br>
Dark mode support and limited responsiveness implementation (to be improved) <br>
> Search - Search by title through filtering according to release year and adult content <br>

> Popular - Based on the TMDB API, you can display a list of the current popular movies and view simple information <br>

> Detail - You can view the details of the selected movies in the search and popular movie list. <br>
> - Display the filmmaker or actor and select them to view the details <br>
> - View videos and images related to the selected movie <br>
> - If there is Collection information, display the list and go to the movie's details when selected.

- 0.2.0 <br>
Develop and Deploy 'Messenger Page' <br>
Messenger Web Application that communicate with other users through chat <br>
> Login - Sign-in via Firebase Authentication Component <br>
> - Membership Subscription Service: Gmail, Github, and other email accounts + Test Account <br>
> - Member profile picture and additional information can be registered and modified. <br>
> - When a user uses Gmail, Application use Google's default Profile <br>

> Friend Management - User can register Other User to friends <br>
> - Search - Searching, Send Friend Request and Request Cancel, Accept and Denying Request from Other user, Block User <br>
> - Friend Management - Open ChatRoom, Delete or Block Friend in Friend List <br>

> Chatting - User can chat with other users.
> - Messaging - Send and Receive Message () <br>
> - File Management - User can check the files uploaded to the chat room and download and delete them. <br>
> - Export - Export Chat Message history (txt, csv) <br>
> - Freeze - User can freeze a chat room to stop the conversation. <br>

- 0.3.0 <br>
Re-factoring and Deploy 'Messenger Page' <br>
ReDesign Layout, Improve Logic and Fix some bug <br>
> Reason for Refactoring
> - Decided to create and manage projects as separate units to prevent layout settings and other conflicts caused by MUI-based Next_Template and Tailwind-based Next_Messenger coexisting in one package at the same time.<br>

> Major changes <br>
> - Modify and improve layouts across projects<br>
> - Improving real-time reflection in chat with the use of the Firebase Snapshot Component<br>
> - Apply the profile background image setting feature<br>
> - Changed the feature to set whether profiles and background images are visible to the public instead of blocking each users<br>
> - Changed the storage location for uploaded files such as images from Google Cloud to Firebase Document<br>
