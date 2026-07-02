let adController: any = null;

export function initAdsgram() {
  if (!window.Adsgram) {
    console.log("AdsGram SDK not loaded");

    return;
  }

  adController = window.Adsgram.init({
    blockId: "36750",
  });

  console.log("AdsGram Initialized");
}

export async function showAdsgramReward() {
  try {
    if (!adController) {
      initAdsgram();
    }

    const result = await adController.show();

    console.log(result);

    if (result.done && !result.error) {
      console.log("Reward Success");

      return true;
    }

    console.log(result.description);

    return false;
  } catch (err) {
    console.error(err);

    return false;
  }
}