import { useForm, isNotEmpty } from "@mantine/form";
import { TextInput, NumberInput, Button } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { modals } from "@mantine/modals";
import { useCreateEvent } from "../../hooks/useEvents";
import { useGetUser } from "../../hooks/useAuth";

export function CreateEventForm() {
  const { mutate: createEvent } = useCreateEvent();
  const { data: user } = useGetUser();
  const form = useForm({
    initialValues: {
      title: "",
      location: "",
      starts_at: new Date(),
      ends_at: new Date(),
      momocoins: 1,
    },

    validate: {
      title: isNotEmpty("Title is required"),
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newEvent = {
      ...form.getValues(),
      created_by: user?.id || "Unknown User",
    };
    createEvent(newEvent);
    modals.closeAll();
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <DateTimePicker
        label="Start Date"
        placeholder="Pick start date"
        {...form.getInputProps("starts_at")}
      />
      <DateTimePicker
        label="End Date"
        placeholder="Pick end date"
        {...form.getInputProps("ends_at")}
      />
      <NumberInput
        label="Momocoins"
        placeholder="Enter number of momocoins"
        {...form.getInputProps("momocoins")}
      />
      <div>
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
}
