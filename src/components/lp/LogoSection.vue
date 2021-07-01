<template>
  <section>
    <h3 class="text-3xl font-extrabold font-nunito-sans text-gray-700 text-center mb-5">
      CT Analysis 掲載プロジェクト
    </h3>
    <div class="icon-wrapper">
      <div class="content Huobi">
        <img src="@/assets/project_logos/440px-Huobi-logo.png" alt="Huobi" />
      </div>
      <div class="content Bithumb">
        <img src="@/assets/project_logos/Bithumb_logo.png" alt="Bithumb" />
      </div>
      <div class="content Coinbase">
        <img src="@/assets/project_logos/Coinbase.png" alt="Coinbase" />
      </div>
      <div class="content Cosmos">
        <img src="@/assets/project_logos/cosmos-logo-black.png" alt="Cosmos" />
      </div>
      <div class="content Binance">
        <img src="@/assets/project_logos/d44818-6-851058-0.png" alt="Binance" />
      </div>
      <div class="content Etherum">
        <img src="@/assets/project_logos/ethereum.svg" alt="Etherum" />
      </div>
      <div class="content Kusama">
        <img src="@/assets/project_logos/KUSAMA_logo_1.png" alt="Kusama" />
      </div>
      <div class="content Solana">
        <img src="@/assets/project_logos/OMnvVEz.png" alt="Solana" />
      </div>
      <div class="content SymbolNem">
        <img
          src="@/assets/project_logos/Symbol_from_nem.png"
          alt="Symbol from Nem"
        />
      </div>
      <div class="content Polkadot">
        <img src="@/assets/project_logos/ダウンロード.png" alt="Polkadot" />
      </div>
    </div>

    <div class="flex justify-end">
      <p class="text-gray-600">上記は一例です</p>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.icon-wrapper {
  display: flex;
  flex: auto;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
}

img {
  max-width: 100%;
  height: auto;
}

.Huobi {
  flex: 0 1 22%;
}

.Bithumb {
  flex: 0 1 22%;
}

.Coinbase {
  flex: 0 1 22%;
}

.Cosmos {
  flex: 0 1 22%;
}

.Binance {
  flex: 0 1 22%;
}

.Etherum {
  flex: 0 1 15%;
}

.Kusama {
  flex: 0 1 22%;
}

.Solana {
  flex: 0 1 30%;
}

.SymbolNem {
  flex: 0 1 22%;
}

.Polkadot {
  flex: 0 1 22%;
}

@media only screen and (max-width: 550px) {
  section {
    display: flex;
    flex: auto;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .Huobi {
    flex: 0 70%;
    margin-bottom: 15px;
  }

  .Bithumb {
    flex: 0 1 80%;
  }

  .Coinbase {
    flex: 0 1 80%;
  }

  .Cosmos {
    flex: 0 1 80%;
  }

  .Binance {
    flex: 0 1 80%;
  }

  .Etherum {
    flex: 0 1 55%;
  }

  .Kusama {
    flex: 0 1 80%;
    margin-top: 15px;
  }

  .Solana {
    flex: 0 1 90%;
    margin: 15px;
  }

  .SymbolNem {
    flex: 0 1 75%;
  }

  .Polkadot {
    flex: 0 1 80%;
  }
}
</style>