import { supabase } from "../../hooks/supabaseClient";

export function TestButton() {
  const handleClick = async () => {
    await testFunction();
  };
  return (
    <button
      onClick={handleClick}
      className="bg-amber-500 p-2 rounded-md cursor-pointer"
    >
      Test
    </button>
  );
}

async function testFunction() {
  const result = await supabase
    .from("profiles")
    .update({ momocoins: 1 })
    .eq("id", "b0254261-0d46-40d0-841c-91cefd0de2a9");
  if (result.error) {
    console.error(result.error);
  } else {
    console.log("Update successful:", result.data);
  }
}
