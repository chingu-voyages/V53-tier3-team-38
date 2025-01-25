import { CustomButton } from "@/components/reusableComponents/customButton";
import { IconButton } from "@/components/reusableComponents/iconButton";

export const ComponentSamplePage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 space-y-12">
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
          <CustomButton size="small" variantColor="white" icon="settings">
            Settings
          </CustomButton>
          <CustomButton size="small" variantColor="green" icon="calendar">
            Calendar
          </CustomButton>
          <CustomButton size="small" variantColor="red" icon="chef-hat">
            Recipe
          </CustomButton>
        </div>
        <div className="flex flex-wrap gap-4">
          <CustomButton size="medium" variantColor="white" icon="warning">
            Warning
          </CustomButton>
          <CustomButton size="medium" variantColor="green" icon="play">
            Play
          </CustomButton>
          <CustomButton size="medium" variantColor="red" icon="gmail">
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
    </main>
  );
};
