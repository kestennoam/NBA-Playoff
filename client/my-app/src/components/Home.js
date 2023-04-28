import React from "react";
import NavBar from "./NavBar";
import Avatar from "@mui/material/Avatar";
import logo from "../assets/NBA 2023 Bracket.png";
import UserBetsTable from "./UserBetsTable";

function Home() {
  const isLoggedIn = localStorage.getItem("userID");

  if (!isLoggedIn) {
    window.location.href = "/login";
  }

  return (
    <div className="homepage">
      <NavBar />
      <div style={{ textAlign: "center", direction: "rtl" }}>
        <h1>2023 NBA Playoff</h1>
        <h2>כללי</h2>
        <ul style={{ display: "inline-block", textAlign: "right" }}>
          <li>יש להגיש את ההימורים הרלוונטיים עד כ5 דקות לפני המשחק הראשון של אותה סדרה.</li>
          <li>אי שליחה של תוצאה לסדרה מסוימת לא מהווה פסילה מההתערבות אלא רק חיסרון ביחס לשאר המשתתפים.</li>
          <li>
            במקרה בו לשני משתתפים או יותר יש את אותו מספר נקודות בסיום, ידורגו לפי פגיעות מדויקות, ובמקרה שגם בקטגוריה
            הזו הם זהים, הם יחלקו בפרס.
          </li>
          <li>עלות כניסה – ₪100.</li>
          <li>יש לבצע את תשלום הכניסה להתערבות עד סוף הסיבוב הראשון.</li>
        </ul>
        <h2>ניקוד</h2>
        <ul style={{ display: "inline-block", textAlign: "right" }}>
          <li>רבע גמר אזורי – 2 נק' עולה, 4 נק' בול.</li>
          <li>חצי גמר אזורי – 3 נק' עולה, 6 נק' בול.</li>
          <li>גמר אזורי – 4 נק' עולה, 8 נק' בול.</li>
          <li>גמר סיפור – 5 נק' עולה, 10 נק' בול.</li>
        </ul>
        <h2>פרסים</h2>
        <ul style={{ display: "inline-block", textAlign: "right" }}>
          <li>מקום ראשון - 70%</li>
          <li>מקום שני - 20%</li>
          <li>מקום שלישי - 10%</li>
        </ul>
      </div>
      <UserBetsTable />
    </div>
  );
}

export default Home;
