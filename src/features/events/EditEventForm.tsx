import { useForm, isNotEmpty } from "@mantine/form";
import { Button, Divider, TextInput, NumberInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { modals } from "@mantine/modals";
import { useUpdateEvent } from "../../hooks";
import type { Event } from "../../types/models";
import { useEffect } from "react";
import { formatDate, formatTime } from "../../utils/date";

export function EditEventForm({ event }: { event: Event }) {
    const { mutate: updateEvent, isPending, isSuccess } = useUpdateEvent();
    const createdBy =
        event.profiles.first_name + " " + event.profiles.last_name;
    const form = useForm({
        initialValues: {
            title: event.title,
            location: event.location,
            starts_at: event.starts_at,
            ends_at: event.ends_at,
            momocoins: event.momocoins,
        },
        validate: {
            title: isNotEmpty("Title is required"),
            location: isNotEmpty("Location is required"),
            starts_at: isNotEmpty("Start date is required"),
            ends_at: isNotEmpty("End date is required"),
            momocoins: isNotEmpty("Momocoins are required"),
        },
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (form.validate().hasErrors) return;
        const updatedEvent = {
            ...event,
            ...form.getValues(),
        };
        updateEvent(updatedEvent);
    };

    useEffect(() => {
        if (isSuccess) {
            modals.closeAll();
        }
    }, [isSuccess]);

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className="text-gray-500 text-sm">
                Created on {formatDate(event.created_at)} -{" "}
                {formatTime(event.created_at)} by {createdBy}
            </p>
            <TextInput
                label="Event Title"
                placeholder="Enter event title"
                {...form.getInputProps("title")}
            />
            <TextInput
                label="Location"
                placeholder="Enter event location"
                {...form.getInputProps("location")}
            />
            <div className="flex gap-4">
                <DateTimePicker
                    label="Start Date"
                    placeholder="Pick start date"
                    {...form.getInputProps("starts_at")}
                    className="grow"
                />
                <DateTimePicker
                    label="End Date"
                    placeholder="Pick end date"
                    {...form.getInputProps("ends_at")}
                    className="grow"
                />
            </div>
            <NumberInput
                label="Momocoins"
                placeholder="Enter number of momocoins"
                {...form.getInputProps("momocoins")}
            />
            <div className="flex justify-end mt-4">
                <Button
                    type="submit"
                    loading={isPending}
                    loaderProps={{ type: "dots" }}
                >
                    Update Event
                </Button>
            </div>
        </form>
    );
}
