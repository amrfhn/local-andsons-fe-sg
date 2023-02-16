<script lang="jsx">

import ProductStepInfo from "@/components/ProductStepInfo";
import stepData from "@/data/productStep.json";

export default {
    components: { ProductStepInfo },
    props: ['productData'],
    data: function() {
        return {
            isMonthlySubscription: false,
        }
    },
    mounted: function() {
        this.checkMonthlySubscription();
    },
    methods: {
        checkMonthlySubscription : function(){
            const _this = this;

            for(let i=0; i < this.productData.product_options.length; i++){
                for(let j=0; j < this.productData.product_options[i].product_option_prices.length; j++) {
                    if( this.productData.product_options[i].product_option_prices[j].sub_duration_type == 'MONTH'){
                        _this.isMonthlySubscription = true;
                        return;
                    }
                }
            }
            return false;
        }
    },
    render() {
        return (
            <div class="product-step">
            {this.productData.prescription_based && this.isMonthlySubscription ?
                <ProductStepInfo customStyle={'variant-small'} data={stepData.steps[0].data} />
                : (!this.productData.prescription_based) ?
                    <ProductStepInfo data={stepData.steps[2].data} />
                    :
                        <ProductStepInfo data={stepData.steps[1].data} />
            }
            </div>
        )
    }
};
</script>
