package com.modeiji.store.payments;

import lombok.Data;

@Data
public class CheckoutResponse {
    private String checkoutUrl;
    private Long orderId;

       public CheckoutResponse(Long orderId, String checkoutUrl) {
            this.orderId = orderId;
            this.checkoutUrl = checkoutUrl;
        }
}