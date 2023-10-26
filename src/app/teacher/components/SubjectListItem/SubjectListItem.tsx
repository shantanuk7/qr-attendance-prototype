import { IconQrcode } from "@tabler/icons-react";
import { IconDots } from "@tabler/icons-react";

export default function SubjectListItem(props:any) {
    return (
        <div className="flex justify-between items-center mx-auto my-2 px-5 py-3 border-2 border-slate-800">
            <div className="p-2">
                <h3 className="text-xs">{props.course}</h3>
                <h2><strong>{props.subject}</strong></h2>
            </div>
            <div className="p-2 flex">
                <button onClick={() => {
                    props.getAttendance(props.course, props.subject);
                }}>
                    <IconDots size={32} color={"#374151"} className="ml-3"/>
                </button>
                <button onClick={() => {
                    props.newAttendance(props.course, props.subject);
                }}>
                    <IconQrcode size={28} color={"#374151"} className="ml-3"/>
                </button>
            </div>
        </div>
    )
}