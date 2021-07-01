<template>
  <section>
    <h3 class="text-3xl font-extrabold font-nunito-sans text-gray-700 text-center mb-8">FAQ</h3>

    <FaqItem>
      <template v-slot:question>
        どういった方々を対象にしていますか？
      </template>
      <template v-slot:answer>
        <p>
          ブロックチェーン、暗号資産（仮想通貨）に関心のある方を対象としています。
        </p>
        <p>
          個人、事業担当者、経営者、投資家の方々の学習に役に立つようにコンテンツ配信をさせて頂いています。
        </p>
      </template>
    </FaqItem>

    <FaqItem>
      <template v-slot:question>
        専門知識がなくてもレポートを理解できますか？
      </template>
      <template v-slot:answer>
        <p>
          ブロックチェーンの最低限の仕組みをご理解頂ければ、基本的に理解できます。
          一部、レポート箇所によったら難しい部分もございます。
        </p>
        <p>
          弊社では初心者向けにYouTubeやテキストメディアでも発信していますので、こちらもご利用し順序立てて理解を深めてください。
        </p>
      </template>
    </FaqItem>

    <FaqItem>
      <template v-slot:question>
        レポートは投資に役立ちますか？
      </template>
      <template v-slot:answer>
        <p>
          投資に役に立つ可能性はあります。実際、当社アンケートの中でも投資に役立ててるとお声を頂いています。
        </p>
        <p>
          ただし、当レポートの目的は、投資を推奨するものではなく、学習できる情報を提供することを目的としています。
        </p>
        <p>最終的に投資のために情報を役立てるかは、お客様で判断してください。</p>
        <p>損害、損失に関しては弊社は一切の責任を持ちません。</p>
      </template>
    </FaqItem>

    <FaqItem>
      <template v-slot:question>
        どんな内容を配信していますか？
      </template>
      <template v-slot:answer>
        <p>
          海外プロジェクトをメインに日本語で発信されてない内容を配信しています。
        </p>
        <p>
          プロジェクトはランディングページにまとまっていますので、ご確認ください。
        </p>
      </template>
    </FaqItem>

    <FaqItem>
      <template v-slot:question>
        無料でレポートは読めますか？
      </template>
      <template v-slot:answer>
        <p>
          現状、無料でレポートを提供させて頂いています。今後、有料も視野に入れていますので料金形態は変更される可能性があります。
        </p>
      </template>
    </FaqItem>

  </section>
</template>


<script>
import FaqItem from '@/components/lp/FaqItem'

export default {
  components: {
    FaqItem
  }
}
</script>


<style lang="postcss" scoped>

</style>