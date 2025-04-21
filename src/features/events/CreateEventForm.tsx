import { useForm, isNotEmpty } from "@mantine/form";
import { TextInput, NumberInput, Button } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

export function CreateEventForm() {
  const form = useForm({
    initialValues: {
      title: "",
      location: "",
      startDate: new Date(),
      endDate: new Date(),
      momocoins: 1,
    },

    validate: {
      title: isNotEmpty("Title is required"),
    },
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(form.getValues());
    modals.closeAll();
    notifications.show({
      title: "Event Successfully Created",
      message: `Event title: ${form.getValues().title}`,
      color: "green",
    });
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
        {...form.getInputProps("startDate")}
      />
      <DateTimePicker
        label="End Date"
        placeholder="Pick end date"
        {...form.getInputProps("endDate")}
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
