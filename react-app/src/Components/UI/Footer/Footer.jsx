import React from "react";

function Footer() {
  return (
    <div className="lg:p-28 lg:pt-10 md:px-12 md:py-28 px-4 py-16 transition-all duration-500 ease-in">
      <p className="text-white sm:text-2xl text-xl">
        Questions? Call +1 (408) 600-1722 (USA)
      </p>
      <table className="text-white sm:text-xl text-base mt-14 w-full">
        <tr>
          <td className="w-1/4 pb-5">
            <a href="/">FAQ</a>
          </td>
          <td className="w-1/4 pb-5">
            <a href="/">Help Center</a>
          </td>
          <td className="w-1/4 pb-5">
            <a href="/">Account</a>
          </td>
          <td className="w-1/4 pb-5">
            <a href="/">Media Center</a>
          </td>
        </tr>
        <tr>
          <td className="pb-5">
            <a href="/">Privacy</a>
          </td>
          <td className="pb-5">
            <a href="/">Jobs</a>
          </td>
          <td className="pb-5">
            <a href="/">Ways to Watch</a>
          </td>
          <td className="pb-5">
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
