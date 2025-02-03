import { CustomButton } from "@/components/reusableComponents/customButton";
import { IconButton } from "@/components/reusableComponents/iconButton";
import { CustomInput } from "@/components/reusableComponents/customInput";
import { StatusCard } from "@/components/reusableComponents/statusCard";
import { MealCard } from "@/components/reusableComponents/mealCard";
import { WeeklyCard } from "@/components/reusableComponents/weeklyCard";
import { DailyCard } from "@/components/reusableComponents/dailyCard";

export const ComponentSamplePage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 space-y-12">
      <section>
        <h2 className="text-2xl font-bold mb-4">Status Card Examples</h2>
        <div className="space-y-4">
          <StatusCard type="alert" message="Nut allergy alert" />
          <StatusCard type="warning" message="Gluten-free option needed." />
        </div>
      </section>

      <section>
        <h1 className="text-3xl font-bold mb-6">Custom Input Examples</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomInput label="Full Name" type="text" placeholder="John Doe" />
          <CustomInput
            label="Email Address"
            type="email"
            placeholder="john@example.com"
          />
          <CustomInput
            label="Password"
            type="password"
            placeholder="Enter your password"
          />
          <CustomButton type="submit" size="big" variantColor="green">
            Submit
          </CustomButton>
        </form>
      </section>

      <section className="space-y-6">
        <h1 className="text-4xl font-bold mb-8">Custom Button Examples</h1>
        <div className="flex flex-wrap gap-4">
          <CustomButton size="medium" variantColor="white">
            Medium White
          </CustomButton>
          <CustomButton size="medium" variantColor="green">
            Edit
          </CustomButton>
          <CustomButton size="big" variantColor="green">
            Sign In
          </CustomButton>
          <CustomButton size="big" variantColor="green">
            Create Account
          </CustomButton>
        </div>
        <div className="flex flex-wrap gap-4">
          <CustomButton size="small" variantColor="white">
            Small White
          </CustomButton>
          <CustomButton size="small" variantColor="green">
            Small Green
          </CustomButton>
          <CustomButton size="small" variantColor="red">
            Small Red
          </CustomButton>
        </div>
        <div className="flex flex-wrap gap-4">
          <CustomButton size="medium" variantColor="white">
            Medium White
          </CustomButton>
          <CustomButton size="medium" variantColor="green">
            Medium Green
          </CustomButton>
          <CustomButton size="medium" variantColor="red">
            Medium Red
          </CustomButton>
        </div>
        <div className="flex flex-wrap gap-4">
          <CustomButton size="big" variantColor="white">
            Big White
          </CustomButton>
          <CustomButton size="big" variantColor="green">
            Big Green
          </CustomButton>
          <CustomButton size="big" variantColor="red">
            Big Red
          </CustomButton>
        </div>
      </section>

      <section className="space-y-6">
        <h1 className="text-4xl font-bold mb-8">Custom Button Examples</h1>
        <div className="flex flex-wrap gap-4">
          <CustomButton size="big" variantColor="white" icon="settings">
            Settings
          </CustomButton>
          <CustomButton size="big" variantColor="green" icon="calendar">
            Calendar
          </CustomButton>
          <CustomButton size="big" variantColor="red" icon="chef-hat">
            Recipe
          </CustomButton>
        </div>
        <div className="flex flex-wrap gap-4">
          <CustomButton size="big" variantColor="white" icon="warning">
            Warning
          </CustomButton>
          <CustomButton size="big" variantColor="green" icon="play">
            Play
          </CustomButton>
          <CustomButton size="big" variantColor="red" icon="gmail">
            Gmail
          </CustomButton>
        </div>
        <div className="flex flex-wrap gap-4">
          <CustomButton size="big" variantColor="white" icon="github">
            GitHub
          </CustomButton>
          <CustomButton size="big" variantColor="green">
            No Icon
          </CustomButton>
          <CustomButton size="big" variantColor="red" icon="settings">
            Settings
          </CustomButton>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold mb-4">Icon Button Examples</h2>
        <div className="flex flex-wrap gap-4">
          <IconButton icon="trash" size="sm" aria-label="Delete (Small)" />
          <IconButton
            icon="trash"
            size="default"
            aria-label="Delete (Default)"
          />
          <IconButton icon="trash" size="lg" aria-label="Delete (Large)" />
        </div>
        <div className="flex flex-wrap gap-4">
          <IconButton icon="pencil" size="sm" aria-label="Edit (Small)" />
          <IconButton
            icon="pencil"
            size="default"
            aria-label="Edit (Default)"
          />
          <IconButton icon="pencil" size="lg" aria-label="Edit (Large)" />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Menu Card Examples</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Daily Card</h3>
            <DailyCard
              day="Mon"
              date={1}
              mealTitle="Mediterranean Feast"
              dishCount={3}
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Weekly Cards</h3>
            <div className="flex flex-wrap gap-4">
              <WeeklyCard
                dayOfWeek="Monday"
                date="September 5, 2025"
                content={{
                  type: "meals",
                  meals: [
                    { name: "Breakfast", calories: 350 },
                    { name: "Lunch", calories: 500 },
                  ],
                }}
              />
              <WeeklyCard
                dayOfWeek="Tuesday"
                date="September 6, 2025"
                content={{ type: "empty" }}
              />
              <WeeklyCard
                dayOfWeek="Wednesday"
                date="September 7, 2025"
                content={{ type: "dayOff" }}
              />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Meal Card</h3>
            <MealCard
              title="Grilled Chicken Salad"
              ingredients={[
                "Chicken breast",
                "Mixed greens",
                "Tomatoes",
                "Cucumber",
                "Balsamic dressing",
              ]}
              calories={350}
              allergens={["Nuts"]}
            />
          </div>
        </div>
      </section>
    </main>
  );
};
