import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Check, X, Rocket } from 'lucide-react';

const ComparisonTable = () => {
  const { t } = useTranslation();

  return (
    <section className="px-6 md:px-12 max-w-[1280px] mx-auto py-24 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="text-center mb-16 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-['Plus_Jakarta_Sans'] text-4xl md:text-5xl font-extrabold mb-4"
        >
          {t('comparison.title')} <br className="md:hidden" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">{t('comparison.titleHighlight')}</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-[#cfc2d7]"
        >
          {t('comparison.subtitle1')} <span className="text-purple-400 font-bold">{t('comparison.subtitle2')}</span>
        </motion.p>
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto">
        <div className="grid grid-cols-4 gap-4 items-end mb-4">
          {/* Header Row */}
          <div className="col-span-1 pb-8 pl-4">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest block mb-1">{t('comparison.seeHow')}</span>
            <span className="text-lg font-bold text-white">{t('comparison.weCompare')}</span>
          </div>

          <div className="col-span-1 bg-gradient-to-b from-purple-900/40 to-black/60 rounded-t-[32px] p-6 text-center border-t border-x border-purple-500/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-blue-500/10" />
            <div className="relative z-10">
              <div className="flex justify-center items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-sm">video_library</span>
                </div>
                <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold">EasyDubbing</h3>
              </div>
              <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-bold rounded-full border border-purple-500/30">
                {t('comparison.bestValue')}
              </span>
            </div>
          </div>

          <div className="col-span-1 bg-white/[0.02] rounded-t-[32px] p-4 md:p-6 text-center border-t border-x border-white/5">
            <h3 className="font-['Plus_Jakarta_Sans'] text-sm md:text-lg font-bold text-gray-300 mb-2 break-words">videodubbing.com</h3>
            <span className="inline-block px-2 md:px-3 py-1 bg-white/5 text-gray-400 text-[10px] md:text-xs font-bold rounded-full border border-white/10">
              {t('comparison.limitedCostly')}
            </span>
          </div>

          <div className="col-span-1 bg-white/[0.02] rounded-t-[32px] p-4 md:p-6 text-center border-t border-x border-white/5">
            <h3 className="font-['Plus_Jakarta_Sans'] text-sm md:text-lg font-bold text-gray-300 mb-2">sync.labs</h3>
            <span className="inline-block px-2 md:px-3 py-1 bg-white/5 text-gray-400 text-[10px] sm:text-xs font-bold rounded-full border border-white/10">
              {t('comparison.usageBased')}
            </span>
          </div>
        </div>

        {/* Feature Rows */}
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 bottom-0 left-[25%] w-[25%] bg-gradient-to-b from-purple-900/20 via-purple-900/10 to-transparent pointer-events-none border-x border-purple-500/20" />
          
          <div className="flex flex-col divide-y divide-white/5 relative z-10">
            {/* Languages */}
            <div className="grid grid-cols-4 items-center">
              <div className="p-5 flex items-center gap-3 text-sm font-medium text-gray-300"><span className="material-symbols-outlined text-gray-500 text-[18px]">language</span>{t('comparison.langSupported')}</div>
              <div className="p-5 text-center font-bold text-white bg-purple-900/10">40+</div>
              <div className="p-5 text-center font-medium text-gray-400">50+</div>
              <div className="p-5 text-center font-medium text-gray-400">50+</div>
            </div>

            {/* Minutes */}
            <div className="grid grid-cols-4 items-center">
              <div className="p-5 flex items-center gap-3 text-sm font-medium text-gray-300"><span className="material-symbols-outlined text-gray-500 text-[18px]">schedule</span>{t('comparison.dubbingMinutes')}</div>
              <div className="p-5 text-center bg-purple-900/10">
                <span className="block font-bold text-white">{t('comparison.unlimited')}</span>
                <span className="text-[10px] text-purple-300">{t('comparison.noLimits')}</span>
              </div>
              <div className="p-5 text-center">
                <span className="block font-medium text-gray-300">{t('comparison.minPerMonth')}</span>
                <span className="text-[10px] text-gray-500">{t('comparison.creatorPlan')}</span>
              </div>
              <div className="p-5 text-center">
                <span className="block font-medium text-gray-300">{t('comparison.payPerSecond')}</span>
                <span className="text-[10px] text-gray-500">{t('comparison.noMonthlyMin')}</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-4 items-center">
              <div className="p-5 flex items-center gap-3 text-sm font-medium text-gray-300"><span className="material-symbols-outlined text-gray-500 text-[18px]">payments</span>{t('comparison.pricing')}</div>
              <div className="p-5 text-center bg-purple-900/10">
                <span className="block font-black text-xl text-white">€69<span className="text-sm font-medium text-gray-400">{t('comparison.perMonth')}</span></span>
                <span className="text-[10px] text-purple-300 font-bold uppercase mt-1 block">{t('comparison.orLifetime')}</span>
              </div>
              <div className="p-5 text-center">
                <span className="block font-bold text-lg text-gray-300">€299<span className="text-sm font-normal text-gray-500">{t('comparison.perMonth')}</span></span>
                <span className="text-[10px] text-gray-500 mt-1 block">{t('comparison.limitedMin')}</span>
              </div>
              <div className="p-5 text-center">
                <span className="block font-bold text-lg text-gray-300">~€2,094+<span className="text-sm font-normal text-gray-500">{t('comparison.perMonth')}</span></span>
                <span className="text-[10px] text-gray-500 mt-1 block">{t('comparison.estimated')}</span>
              </div>
            </div>

            {/* Local Processing */}
            <div className="grid grid-cols-4 items-center">
              <div className="p-5 flex items-center gap-3 text-sm font-medium text-gray-300"><span className="material-symbols-outlined text-gray-500 text-[18px]">all_inclusive</span>{t('comparison.localProc')}</div>
              <div className="p-5 flex items-center justify-center gap-2 font-bold text-white bg-purple-900/10">
                <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400"><Check size={12} strokeWidth={3} /></div>
                {t('comparison.unlimited')}
              </div>
              <div className="p-5 flex items-center justify-center gap-2 font-medium text-gray-400">
                <X size={16} className="text-red-400" /> {t('comparison.limited')}
              </div>
              <div className="p-5 flex items-center justify-center gap-2 font-medium text-gray-400">
                <X size={16} className="text-red-400" /> {t('comparison.no')}
              </div>
            </div>

            {/* Voice Cloning */}
            <div className="grid grid-cols-4 items-center">
              <div className="p-5 flex items-center gap-3 text-sm font-medium text-gray-300"><span className="material-symbols-outlined text-gray-500 text-[18px]">record_voice_over</span>{t('comparison.cloning')}</div>
              <div className="p-5 flex items-center justify-center gap-2 font-bold text-white bg-purple-900/10">
                <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400"><Check size={12} strokeWidth={3} /></div>
                {t('comparison.yes')}
              </div>
              <div className="p-5 text-center">
                <div className="flex items-center justify-center gap-2 font-medium text-gray-400"><X size={16} className="text-red-400" /> {t('comparison.notIncluded')}</div>
                <span className="text-[10px] text-gray-500">{t('comparison.higherPlans')}</span>
              </div>
              <div className="p-5 flex items-center justify-center gap-2 font-medium text-gray-400">
                <X size={16} className="text-red-400" /> {t('comparison.notIncluded')}
              </div>
            </div>

            {/* Complex Fees */}
            <div className="grid grid-cols-4 items-center">
              <div className="p-5 flex items-center gap-3 text-sm font-medium text-gray-300"><span className="material-symbols-outlined text-gray-500 text-[18px]">credit_card</span>{t('comparison.complexFees')}</div>
              <div className="p-5 flex items-center justify-center gap-2 font-bold text-white bg-purple-900/10">
                <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400"><Check size={12} strokeWidth={3} /></div>
                {t('comparison.no')}
              </div>
              <div className="p-5 text-center">
                <div className="flex items-center justify-center gap-2 font-medium text-gray-400"><X size={16} className="text-red-400" /> {t('comparison.yes')}</div>
                <span className="text-[10px] text-gray-500">{t('comparison.perMinCharges')}</span>
              </div>
              <div className="p-5 text-center">
                <div className="flex items-center justify-center gap-2 font-medium text-gray-400"><X size={16} className="text-red-400" /> {t('comparison.yes')}</div>
                <span className="text-[10px] text-gray-500">{t('comparison.perFrameCharges')}</span>
              </div>
            </div>

            {/* Cancel Anytime */}
            <div className="grid grid-cols-4 items-center">
              <div className="p-5 flex items-center gap-3 text-sm font-medium text-gray-300"><span className="material-symbols-outlined text-gray-500 text-[18px]">verified_user</span>{t('comparison.cancelAnytime')}</div>
              <div className="p-5 flex items-center justify-center gap-2 font-bold text-white bg-purple-900/10">
                <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400"><Check size={12} strokeWidth={3} /></div>
                {t('comparison.yes')}
              </div>
              <div className="p-5 flex items-center justify-center gap-2 font-medium text-gray-400">
                <Check size={16} className="text-green-500" /> {t('comparison.yes')}
              </div>
              <div className="p-5 flex items-center justify-center gap-2 font-medium text-gray-400">
                <Check size={16} className="text-green-500" /> {t('comparison.yes')}
              </div>
            </div>

            {/* Storage */}
            <div className="grid grid-cols-4 items-center">
              <div className="p-5 flex items-center gap-3 text-sm font-medium text-gray-300"><span className="material-symbols-outlined text-gray-500 text-[18px]">cloud</span>{t('comparison.storage')}</div>
              <div className="p-5 text-center font-bold text-white bg-purple-900/10">{t('comparison.unlimited')}</div>
              <div className="p-5 text-center font-medium text-gray-400">
                <span className="block">20GB</span>
                <span className="text-[10px] text-gray-500">{t('comparison.creatorPlan')}</span>
              </div>
              <div className="p-5 text-center font-medium text-gray-400">{t('comparison.notSpecified')}</div>
            </div>

            {/* Lifetime Option */}
            <div className="grid grid-cols-4 items-center">
              <div className="p-5 flex items-center gap-3 text-sm font-medium text-gray-300"><span className="material-symbols-outlined text-gray-500 text-[18px]">workspace_premium</span>{t('comparison.lifetimeOption')}</div>
              <div className="p-5 text-center bg-purple-900/10">
                <span className="block font-bold text-white">{t('comparison.yes')}</span>
                <span className="text-[10px] text-purple-300">{t('comparison.lifetimePro')}</span>
              </div>
              <div className="p-5 flex items-center justify-center gap-2 font-medium text-gray-400">
                <X size={16} className="text-red-400" /> {t('comparison.no')}
              </div>
              <div className="p-5 flex items-center justify-center gap-2 font-medium text-gray-400">
                <X size={16} className="text-red-400" /> {t('comparison.no')}
              </div>
            </div>

            {/* Winner Row */}
            <div className="grid grid-cols-4 items-stretch border-t-2 border-white/10">
              <div className="p-6 bg-purple-500/5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-yellow-500 text-2xl">emoji_events</span>
                  <span className="font-bold text-white">{t('comparison.winnerTitle')}</span>
                </div>
                <p className="text-xs text-gray-400">{t('comparison.winnerSubtitle')}</p>
              </div>
              <div className="p-6 text-center bg-gradient-to-b from-purple-900/40 to-purple-600/20 rounded-b-[32px] border-b border-x border-purple-500/30">
                <div className="flex justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-yellow-500 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <h4 className="font-bold text-white text-lg mb-1">{t('comparison.bestChoice')}</h4>
                <p className="text-xs text-purple-200">{t('comparison.bestChoiceDesc')}</p>
              </div>
              <div className="p-6 text-center">
                <div className="flex justify-center gap-1 mb-2 opacity-50">
                  {[...Array(2)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-yellow-500 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <h4 className="font-bold text-gray-300 text-sm mb-1">{t('comparison.expensiveLimited')}</h4>
                <p className="text-[10px] text-gray-500" dangerouslySetInnerHTML={{ __html: t('comparison.expensiveLimitedDesc') }}></p>
              </div>
              <div className="p-6 text-center">
                <div className="flex justify-center gap-1 mb-2 opacity-50">
                  <span className="material-symbols-outlined text-yellow-500 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <h4 className="font-bold text-gray-300 text-sm mb-1">{t('comparison.mostExpensive')}</h4>
                <p className="text-[10px] text-gray-500" dangerouslySetInnerHTML={{ __html: t('comparison.mostExpensiveDesc') }}></p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 bg-gradient-to-r from-black via-purple-900/20 to-black border border-purple-500/30 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-purple-500/10"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shrink-0">
              <Rocket size={32} className="text-white" />
            </div>
            <div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-xl md:text-2xl font-bold text-white mb-2">{t('comparison.ctaTitle')}</h3>
              <p className="text-[#cfc2d7] text-sm md:text-base">{t('comparison.ctaDesc')}</p>
            </div>
          </div>
          <a href="#pricing" className="shrink-0 px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold shadow-lg shadow-purple-500/30 hover:scale-105 transition-transform whitespace-nowrap">
            {t('comparison.tryToday')}
            <span className="block text-[10px] font-normal opacity-80 uppercase tracking-widest mt-1 text-center">{t('comparison.professionalDubbing')}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonTable;
