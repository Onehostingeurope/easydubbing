import { useEffect, useState } from 'react';

interface PayPalSubscriptionProps {
  planId: string;
  clientId: string;
}

declare global {
  interface Window {
    paypal?: any;
    paypalLoadingPromise?: Promise<void>;
  }
}

const PayPalSubscription = ({ planId, clientId }: PayPalSubscriptionProps) => {
  const [isReady, setIsReady] = useState(false);
  const containerId = `paypal-button-container-${planId}`;

  useEffect(() => {
    let isMounted = true;

    const initPayPal = async () => {
      // Create a global promise so multiple instances coordinate
      if (!window.paypalLoadingPromise) {
        window.paypalLoadingPromise = new Promise((resolve, reject) => {
          const scriptId = 'paypal-sdk-script';
          if (document.getElementById(scriptId)) {
            // Already exists, just wait for the window object
            const checkButtons = () => {
              if (window.paypal && window.paypal.Buttons) {
                resolve();
              } else {
                setTimeout(checkButtons, 100);
              }
            };
            checkButtons();
            return;
          }

          const script = document.createElement('script');
          script.id = scriptId;
          script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&vault=true&intent=subscription`;
          script.setAttribute('data-sdk-integration-source', 'button-factory');
          script.async = true;
          script.onload = () => {
            const checkButtons = () => {
              if (window.paypal && window.paypal.Buttons) {
                resolve();
              } else {
                setTimeout(checkButtons, 100);
              }
            };
            checkButtons();
          };
          script.onerror = () => reject(new Error('Failed to load PayPal SDK'));
          document.body.appendChild(script);
        });
      }

      try {
        await window.paypalLoadingPromise;
        if (isMounted) setIsReady(true);
      } catch (err) {
        console.error(err);
      }
    };

    initPayPal();

    return () => {
      isMounted = false;
    };
  }, [clientId]);

  useEffect(() => {
    if (isReady) {
      const container = document.getElementById(containerId);
      if (container && container.innerHTML === '') {
        window.paypal.Buttons({
          style: {
            shape: 'rect',
            color: 'gold',
            layout: 'vertical',
            label: 'subscribe'
          },
          createSubscription: function(_data: any, actions: any) {
            return actions.subscription.create({
              'plan_id': planId
            });
          },
          onApprove: function(data: any) {
            window.location.href = `https://www.easydubbing.uk/success?subscriptionID=${data.subscriptionID}`;
          },
          onError: function(err: any) {
            console.error('PayPal Error:', err);
          }
        }).render(`#${containerId}`);
      }
    }
  }, [isReady, planId, containerId]);

  return (
    <div 
      id={containerId} 
      className="w-full min-h-[150px] flex items-center justify-center bg-white/5 rounded-2xl border border-white/5 transition-all"
    >
      {!isReady && (
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
          <div className="text-[10px] text-primary/40 font-bold uppercase tracking-widest animate-pulse">
            Secure Checkout Loading...
          </div>
        </div>
      )}
    </div>
  );
};

export default PayPalSubscription;
