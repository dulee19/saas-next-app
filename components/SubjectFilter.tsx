"use client"

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { subjects } from "@/constants";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SubjectFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("subject") || "";

    const [subject, setSubject] = useState<string>(query);

    useEffect(() => {
        let newUrl = "";

        if(subject === "all") {
            newUrl = removeKeysFromUrlQuery({
                params: searchParams.toString(),
                keysToRemove: ["subject"]
            });
        } else {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "subject",
                value: subject
            });
        };

        router.push(newUrl, { scroll: false });
    }, [subject, router, searchParams])

  return (
    <Select onValueChange={setSubject} value={subject}>
        <SelectTrigger className="input capitalize">
            <SelectValue placeholder="Select Subject" />
        </SelectTrigger>

        <SelectContent>
            <SelectItem value="all">All subjects</SelectItem>
            {subjects.map((subject) => (
                <SelectItem
                    key={subject}
                    value={subject}
                    className="capitalize"
                >
                    {subject}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
  )
}

export default SubjectFilter