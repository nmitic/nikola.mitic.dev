import { cookies } from "next/headers";
import { JobData, JobWithSplitTesting } from "../../types/cv";

type WeightedObject<T> = {
  weight: number;
  value: T;
};

export class SplitTestData {
  data;

  constructor(data: JobData<JobWithSplitTesting>) {
    this.data = data;
  }

  private getRandomItem<T>(weightedArray: WeightedObject<T>[]): T {
    const totalWeight = weightedArray.reduce(
      (sum, item) => sum + item.weight,
      0
    );
    let randomValue = Math.random() * totalWeight;

    for (const item of weightedArray) {
      randomValue -= item.weight;
      if (randomValue <= 0) {
        return item.value;
      }
    }

    // If the loop completes without returning a value, we can assume the array is empty.
    throw new Error("Weighted array is empty");
  }

  private getVariants() {
    return [
      { weight: this.data.job.originalVariantWeight, value: this.data.job },
      ...this.data.job.splitTesting.map((item: any) => ({
        weight: item.weight,
        value: item.variantResource,
      })),
    ];
  }

  private getCookieStore() {
    return cookies();
  }

  private getCookieVariant() {
    return this.getCookieStore().get(
      `split.test.${this.data.splitTestings[0].id}`
    );
  }

  get splitTestId() {
    return this.data.splitTestings[0].id
  }

  get hasSplitTestRunning() {
    return this.data.splitTestings[0]?.enableSplitTesting;
  }

  get splitTestContent() {
    // Returns original variant if test is not run
    if (this.hasSplitTestRunning) {
      // Returns random variant if cookie is not set
      if (this.getCookieVariant()) {
        const cookieVariant = this.getCookieVariant()?.value;
        const foundVariant = this.getVariants().find(
          (item) => item.value.id === cookieVariant
        );
        return foundVariant ? foundVariant.value : null;
      } else {
        return this.getRandomItem(this.getVariants());
      }
    } else {
      return this.data.job;
    }
  }
}