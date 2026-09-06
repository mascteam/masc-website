"use client";

import { useState } from "react";
import QRCode from "react-qr-code";

const UrlToQrPage = () => {
  const [link, setLink] = useState("");

  return (
    <section className="min-h-screen flex justify-center items-center px-6 mt-10">
      <div className="w-full max-w-5xl flex flex-col items-center gap-10">
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wide">
          {link ? "Scan QR" : "Enter Link Below"}
        </h1>

        <input
          type="text"
          placeholder="Paste feedback link..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="cursor-target w-full max-w-2xl border-0 border-b bg-transparent outline-none text-center text-lg"
        />

        {link && (
          <>
            <div className="cursor-target bg-white p-6 md:p-8">
              <QRCode value={link} size={420} />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default UrlToQrPage;
