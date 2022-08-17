import React from "react";

function Footer() {
  return (
    <div className="p-28">
      <p className="text-white text-2xl">
        Questions? Call +1 (408) 600-1722 (USA)
      </p>
      <table className="text-white text-xl mt-14">
        <tr>
          <td>
            <a href="/">FAQ</a>
          </td>
          <td>
            <a href="/">Help Center</a>
          </td>
          <td>
            <a href="/">Account</a>
          </td>
          <td>
            <a href="/">Media Center</a>
          </td>
        </tr>
        <tr>
          <td>
            <a href="/">Privacy</a>
          </td>
          <td>
            <a href="/">Jobs</a>
          </td>
          <td>
            <a href="/">Ways to Watch</a>
          </td>
          <td>
            <a href="/">Terms of Use</a>
          </td>
        </tr>
        <tr>
          <td>
            <a href="/">Speed Test</a>
          </td>
          <td>
            <a href="/">Cookie Preferences</a>
          </td>
          <td>
            <a href="/">Corporate Information</a>
          </td>
          <td>
            <a href="/">Contact Us</a>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default Footer;
