"use client";

import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, BarcodeFormat, DecodeHintType } from "@zxing/library";
import axiosInstance from "@/services/axios";
import { EventType } from "@/app/events/create/page";
import { toasty } from "@/components/ToastProvider";
import { SendHorizonal } from "lucide-react";

export type markedAttendanceType = {
  _id: string;
  studentID: {
    _id: string;
    name: string;
    year: string;
    department: string;
    division: string;
    moodleID: string;
  };
  eventID: string;
  createdAt: string;
  updatedAt: string;
};

const AttendancePage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);
  const isProcessingRef = useRef(false);

  const eventRef = useRef<EventType | null>(null);

  const statusList = {
    ready: "ready, to scan moodleID's",
    success: "marked, attendance successfully",
    failure: "failed, to mark attendance",
  };

  const [status, setStatus] = useState<string>(statusList.ready);

  const [markedIDs, setMarkedIDs] = useState<markedAttendanceType[]>([]);

  const fetchEvent = async () => {
    try {
      const { slug } = await params;

      const { data: eventData }: { data: { event: EventType } } = await axiosInstance.get(`/events/${slug}`);

      eventRef.current = eventData.event;

      const {
        data: attendanceData,
      }: {
        data: { markedStudentList: markedAttendanceType[] };
      } = await axiosInstance.get(`/events/${eventData.event._id}/attendance-preview`);

      setMarkedIDs(attendanceData.markedStudentList);
    } catch (error: any) {
      toasty(error.response?.data?.message || "failed to fetch event");
      eventRef.current = null;
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  useEffect(() => {
    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [
      BarcodeFormat.CODE_128,
      BarcodeFormat.EAN_13,
      BarcodeFormat.EAN_8,
      BarcodeFormat.UPC_A,
      BarcodeFormat.UPC_E,
    ]);

    const reader = new BrowserMultiFormatReader(hints);
    readerRef.current = reader;

    reader.decodeFromVideoDevice(null, videoRef.current!, async (result) => {
      if (!result || isProcessingRef.current) return;

      isProcessingRef.current = true;
      const moodleID = result.getText();

      try {
        const { data } = await axiosInstance.post(
          `/events/attended`,
          { eventID: eventRef.current?._id, moodleID },
          { withCredentials: true },
        );

        setStatus(statusList.success + ` for ${moodleID}`);

        setTimeout(() => {
          isProcessingRef.current = false;
        }, 1500);

        toasty("marked successfully");

        setMarkedIDs(data.markedStudentList);
      } catch (error: any) {
        isProcessingRef.current = false;

        setStatus(statusList.failure + ` for ${moodleID}`);
        toasty(error.response.data.message || statusList.failure + ` for ${moodleID}`);
      }
    });

    return () => {
      reader.reset();
    };
  }, []);

  const [manualID, setManualID] = useState<string>("");

  const manualMark = async () => {
    try {
      if (manualID.length < 8) throw new Error("length must be of atleast 8 charcters");

      const { data } = await axiosInstance.post(
        `/events/attended`,
        { eventID: eventRef.current?._id, moodleID: manualID },
        { withCredentials: true },
      );
      setStatus(statusList.success + ` for ${manualID}`);
      toasty("marked successfully");
      setMarkedIDs(data.markedStudentList);
    } catch (error: any) {
      setStatus(statusList.failure + ` for ${manualID}`);
      toasty(error.response.data.message || statusList.failure + ` for ${manualID}`);
    } finally {
      setManualID("");
    }
  };

  return (
    <section className="w-[90vw] min-h-[80vh] py-10 mx-auto">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* LEFT - Scanner */}
        <div className="w-full lg:w-[35%] flex flex-col gap-8">
          <div className="aspect-[3/4] border overflow-hidden">
            <video ref={videoRef} className="w-full h-full object-cover" />
          </div>

          <div>
            <p className="text-xs uppercase opacity-50 mb-2">Scanner Status</p>

            <p>{status}</p>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Manual Moodle ID"
              value={manualID}
              onChange={(e) => setManualID(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") manualMark();
              }}
              className="flex-1 border-0 border-b bg-transparent outline-none"
            />

            <button onClick={manualMark} className="border-b pb-1 hover:opacity-70 transition">
              <SendHorizonal size={18} />
            </button>
          </div>
        </div>

        {/* RIGHT - Attendance */}
        <div className="w-full lg:flex-1 flex flex-col gap-10">
          <div>
            <h1 className="text-xl md:text-5xl font-bold uppercase">Attendance</h1>

            <p className="mt-3 text-xs uppercase opacity-50">{markedIDs.length} Students Marked</p>
          </div>

          {markedIDs.length > 0 ? (
            <div className="w-full overflow-x-auto border-t">
              <table className="w-full text-left text-xs">
                <thead className="border-b">
                  <tr>
                    <th className="px-3 py-2 font-medium">Name</th>
                    <th className="px-3 py-2 font-medium">Department</th>
                    <th className="px-3 py-2 font-medium">Year</th>
                  </tr>
                </thead>

                <tbody>
                  {markedIDs.map((record) => (
                    <tr key={record._id} className="border-b last:border-b-0">
                      <td className="px-3 py-2 whitespace-nowrap">{record.studentID.name}</td>

                      <td className="px-3 py-2 whitespace-nowrap">{record.studentID.department}</td>

                      <td className="px-3 py-2 whitespace-nowrap">{record.studentID.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="border-t pt-4">
              <span className="text-xs opacity-50">No attendance marked yet.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AttendancePage;
