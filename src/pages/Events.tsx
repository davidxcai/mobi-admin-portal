import { Card, Tabs, TextInput, Title, Text, Stack } from "@mantine/core";
import {
    EventsTable,
    CheckInsTable,
    CurrentEvent,
    CreateEventForm,
} from "../features/events";
import { ModalFormButton, RefreshButton } from "../components/buttons";
import { IconSearch } from "@tabler/icons-react";

export function Events() {
    const refreshEvents = () => {
        console.log("Refresh events");
        // replace with hook later
    };
    const refreshCheckins = () => {
        console.log("Refresh check-ins");
        // replace with hook later
    };
    return (
        <Stack h="100%" gap="md">
            <Title order={1}>Events</Title>
            <Text c="dimmed" size="sm">
                Manage and track all MOBI organization events.
            </Text>
            <Tabs defaultValue="events">
                <Tabs.List className="mb-4">
                    <Tabs.Tab value="events">Events</Tabs.Tab>
                    <Tabs.Tab value="checkins">Check-Ins</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="events">
                    <Card>
                        <div className="flex justify-between items-center">
                            <Title order={3}>2 Events</Title>

                            <div className="flex gap-4">
                                <ModalFormButton
                                    title="Create Event"
                                    form={<CreateEventForm />}
                                />

                                <RefreshButton action={refreshEvents} />
                            </div>
                        </div>
                        <TextInput
                            leftSection={<IconSearch size={16} />}
                            placeholder="Search events..."
                            my="md"
                        />
                        <EventsTable />
                    </Card>
                </Tabs.Panel>
                <Tabs.Panel value="checkins">
                    <Card mb="lg">
                        <CurrentEvent />
                    </Card>
                    {/* <Divider my="md" /> */}
                    <Card>
                        <div className="flex justify-between items-center">
                            <strong className="text-2xl">Check-Ins</strong>
                            <RefreshButton action={refreshCheckins} />
                        </div>
                        <CheckInsTable />
                    </Card>
                </Tabs.Panel>
            </Tabs>
        </Stack>
    );
}
