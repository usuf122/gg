import React from 'react';
import { Copy, Check, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const DuaCard = ({ dua, cardNumber, totalCards }) => {
  const [copiedField, setCopiedField] = React.useState(null);

  const handleCopy = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success('Скопировано в буфер обмена', {
        duration: 2000,
        style: {
          background: '#044736',
          color: '#fff',
          border: 'none',
        },
      });
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      toast.error('Не удалось скопировать');
    }
  };

  const CopyButton = ({ text, field }) => (
    <Button
      variant="ghost"
      size="sm"
      data-testid={`copy-${field}-btn-${dua.id}`}
      onClick={() => handleCopy(text, field)}
      className="h-8 w-8 p-0 text-sage hover:bg-emerald-50 hover:text-emerald transition-all duration-300"
    >
      {copiedField === field ? (
        <Check className="h-4 w-4 text-emerald" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );

  return (
    <div 
      data-testid={`dua-card-${dua.id}`}
      className="dua-card bg-white rounded-2xl shadow-xl shadow-emerald/5 border border-subtle overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald to-emerald/90 px-6 py-4 sm:px-8 sm:py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-gold" />
            </div>
            <div>
              <h2 className="font-heading text-lg sm:text-xl font-semibold text-white">
                {dua.title}
              </h2>
              <p className="text-cream/80 text-xs sm:text-sm font-body">
                {cardNumber} из {totalCards}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8 space-y-8">
        {/* Arabic Text */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sage text-sm font-body font-medium uppercase tracking-wider">
              Арабский текст
            </span>
            <CopyButton text={dua.arabic} field="arabic" />
          </div>
          <div 
            dir="rtl" 
            className="text-2xl sm:text-3xl md:text-4xl leading-loose text-center font-arabic text-arabic p-4 sm:p-6 bg-cream/50 rounded-xl border border-gold/20"
          >
            {dua.arabic}
          </div>
        </div>

        {/* Transliteration */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sage text-sm font-body font-medium uppercase tracking-wider">
              Транскрипция
            </span>
            <CopyButton text={dua.transliteration} field="transliteration" />
          </div>
          <div className="text-base sm:text-lg leading-relaxed text-center font-body text-secondary p-4 sm:p-6 bg-sage/10 rounded-xl border border-sage/20 italic">
            {dua.transliteration}
          </div>
        </div>

        {/* Translation */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sage text-sm font-body font-medium uppercase tracking-wider">
              Перевод
            </span>
            <CopyButton text={dua.translation} field="translation" />
          </div>
          <div className="text-base sm:text-lg leading-relaxed text-center font-body text-primary p-4 sm:p-6 bg-emerald/5 rounded-xl border border-emerald/10">
            {dua.translation}
          </div>
        </div>

        {/* Source */}
        <div className="pt-4 border-t border-subtle">
          <p className="text-xs sm:text-sm text-secondary/70 text-center font-body">
            <span className="font-medium text-sage">Источник:</span> {dua.source}
          </p>
        </div>
      </div>
    </div>
  );
};
