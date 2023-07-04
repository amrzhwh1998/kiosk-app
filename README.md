# kiosk-app
kiosk system for restaurants (react , node.js , mongodb)


ברוכים הבאים לקובץ הREADME.md של המערכת השולחנית להזמנות במסעדה!

# מערכת הזמנות שולחנית למסעדה (Kiosk System) - README
[![Kiosk System](https://cv.amrzhwh.com/wp-content/uploads/2023/07/kioskvid.mp4)](https://cv.amrzhwh.com/wp-content/uploads/2023/07/kioskvid.mp4)

## תיאור המערכת / הרכב המערכת

# צד לקוח:
המערכת השולחנית היא אפליקציה שמאפשרת ללקוחות להזמין אוכל במסעדה באמצעות עמדת קיוסק (מסך מגע). האפליקציה מציגה ללקוח את הקטגוריות והמוצרים הזמינים ואחראית על לתהליך ההזמנה. למערכת יש גם צד של המנהל, המאפשר לעובדי המסעדה לעקוב אחרי ההזמנות ולבצע אישורים.

# צד מנהל:
המערכת מורכבת משלושה חלונות ניהול עבור הצוות במסעדה:

1.**חלון הקופה** - זהו חלון הפעלה במחשב הקופה החכם של המסעדה. לאחר שההזמנה מתקבלת, עובד של הקופה מאשר את התשלום. לאחר האישור, ההזמנה עוברת לחלון ניהול המטבח.


2.**חלון ניהול המטבח** - זהו חלון הפעלה(טאבלט ) הממוקם ליד המטבח, שבו מתבצעת קבלת ההזמנות לאחר אישור הקופה, הזמנות מוצגות בחלון זה עד שהאוכל מוכן. לאחר אישור המטבח, מספר ההזמנה מועבר לטלוויזיה הממוקמת מול הלקוחות, מעיד על כך שההזמנה מוכנה וממתינה לקוח לקחת אותה מהקופה.

3.**טלוויזיה ללקוחות** - מסך טלוויזיה ממוקם מול הלקוחות ומציג את מספר ההזמנות המוכנות לקחת. מספר ההזמנות מוצג למשך זמן מוגבל (לדוגמה, כמה דקות), ואז הם נמחקים מהתצוגה.


## כל המידע של השליחות והקבלות מתקבל ממסד הנתונים בזמן אמת


## הוראות הרצה

כדי להריץ את המערכת, יש לבצע את השלבים הבאים:

1. התקן את התלויות לצד לקוח וגם לצד מנהל באמצעות הפקודה `npm install`.

2. הרץ את השרת באמצעות הפקודה `npm start` : `http://localhost:3000` 

3. נווט לכתובת `http://localhost:3000` בדפדפן כדי להציג את ממשק המשתמש של המערכת.

4. עבור לכתובת `http://localhost:3002` כדי להציג את ממשק הניהול של המערכת.
