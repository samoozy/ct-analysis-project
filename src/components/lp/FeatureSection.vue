<template>
  <h3 class="text-3xl font-extrabold font-nunito-sans text-gray-700 text-center">Features</h3>

  <div class="block mt-8 lg:grid lg:grid-cols-3 lg:gap-5">
    <FeatureItem>
      <template v-slot:img>
        <img class="h-full" src="@/assets/feature_img/feature1.png" alt="">
      </template>
      <template v-slot:title>
        満足度90%以上の信頼性高いレポート
      </template>
      <template v-slot:text-primary>
        弊社アンケートの結果、CT アナリシスを購読して頂いた方の満足度は90%以上となっております。
      </template>
      <template v-slot:text-secondary>
        また、500以上のプロダクトをリサーチしたことにより信頼性の高いレポートを配信できています。
      </template>
    </FeatureItem>

    <FeatureItem>
      <template v-slot:img>
        <img class="h-full" src="@/assets/feature_img/feature2.png" alt="">
      </template>
      <template v-slot:title>
        難しい海外情報を日本語でキャッチアップ
      </template>
      <template v-slot:text-primary>
        海外プロジェクトを日本語に落とし込み、基本情報からエコシステムまで網羅的にキャッチアップできます。
      </template>
      <template v-slot:text-secondary>
        英語ができない方でも理解できるレポートと仕上がっています。
      </template>
    </FeatureItem>

    <FeatureItem>
      <template v-slot:img>
        <img class="h-full" src="@/assets/feature_img/feature3.png" alt="">
      </template>
      <template v-slot:title>
        50時間以上リサーチした内容を10分でインプット
      </template>
      <template v-slot:text-primary>
        弊社のスペシャリストが50時間以上かけてリサーチした内容をわかりやすく解説されたレポートです。
      </template>
      <template v-slot:text-secondary>
        約10分でインプットできますので、時間コストを削減することができます。
      </template>
    </FeatureItem>
  </div>


</template>

<script>
import FeatureItem from '@/components/lp/FeatureItem'

export default {
  components: {
    FeatureItem
  }
}
</script>
