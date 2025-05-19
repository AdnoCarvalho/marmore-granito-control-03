
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info, HelpCircle } from "lucide-react";

interface NCMHelpTooltipProps {
  compact?: boolean;
}

const NCMHelpTooltip: React.FC<NCMHelpTooltipProps> = ({ compact = false }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-muted-foreground hover:text-primary"
              onClick={() => setIsDialogOpen(true)}
            >
              <Info className="h-4 w-4" />
              <span className="sr-only">Informações sobre NCM</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>O que é NCM e como classificar corretamente</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Nomenclatura Comum do Mercosul (NCM) - Setor de Rochas Ornamentais
            </DialogTitle>
            <DialogDescription>
              Guia completo para classificação fiscal de mármores e granitos
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 text-sm">
            <section>
              <h3 className="font-medium text-base">O que é NCM?</h3>
              <p>
                A Nomenclatura Comum do Mercosul (NCM) é um código de oito dígitos utilizado para identificar
                e classificar mercadorias. Ele é baseado no Sistema Harmonizado de Designação e de Codificação
                de Mercadorias (SH) e é utilizado pelos países membros do Mercosul (Brasil, Argentina, Paraguai e Uruguai).
              </p>
            </section>

            <section>
              <h3 className="font-medium text-base">Por que o NCM é importante?</h3>
              <p>
                O NCM é fundamental para:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Determinar a alíquota dos impostos incidentes nas operações de importação e exportação</li>
                <li>Padronização para emissão de notas fiscais eletrônicas</li>
                <li>Identificação precisa das mercadorias nas operações comerciais</li>
                <li>Cumprimento de obrigações fiscais e aduaneiras</li>
                <li>Aplicação de benefícios fiscais específicos</li>
              </ul>
            </section>

            <section>
              <h3 className="font-medium text-base">Principais códigos NCM para o setor de Rochas:</h3>
              <div className="mt-2 border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código NCM</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap text-xs">2515.11.00</td>
                      <td className="px-3 py-2 text-xs">Mármore bruto ou desbastado</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap text-xs">2516.11.00</td>
                      <td className="px-3 py-2 text-xs">Granito bruto ou desbastado</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap text-xs">6802.91.00</td>
                      <td className="px-3 py-2 text-xs">Mármore trabalhado/beneficiado</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap text-xs">6802.93.10</td>
                      <td className="px-3 py-2 text-xs">Granito trabalhado para construção</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap text-xs">6802.99.10</td>
                      <td className="px-3 py-2 text-xs">Outras pedras trabalhadas (mosaicos, peças)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h3 className="font-medium text-base">Como classificar corretamente:</h3>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>
                  <span className="font-medium">Material em estado bruto:</span> Use códigos na faixa 25xx (2515.11.00 para
                  mármore bruto, 2516.11.00 para granito bruto)
                </li>
                <li>
                  <span className="font-medium">Material beneficiado:</span> Use códigos na faixa 68xx, com a subcategoria
                  dependendo do tipo de material e seu uso final
                </li>
                <li>
                  <span className="font-medium">Considere o nível de processamento:</span> Quanto mais beneficiado o produto,
                  diferente será seu código NCM
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-medium text-base">Tributos associados:</h3>
              <p className="mt-1 mb-2">
                Os principais tributos relacionados aos NCMs do setor são:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>ICMS: varia conforme a operação e o estado (geralmente entre 7% e 18%)</li>
                <li>IPI: pode variar de 0% a 10% dependendo do nível de beneficiamento</li>
                <li>PIS: geralmente 1,65% para regime não-cumulativo</li>
                <li>COFINS: geralmente 7,6% para regime não-cumulativo</li>
              </ul>
              <p className="mt-2 text-xs text-muted-foreground">
                * As alíquotas podem variar conforme legislação específica, operações interestaduais
                e benefícios fiscais aplicáveis.
              </p>
            </section>

            <section>
              <h3 className="font-medium text-base">Dicas para evitar erros:</h3>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Sempre verifique a tabela NCM atualizada da Receita Federal</li>
                <li>Classifique o produto considerando seu estado final na operação</li>
                <li>Em caso de dúvida, consulte um especialista em tributação</li>
                <li>Mantenha-se informado sobre mudanças na legislação fiscal</li>
              </ul>
            </section>
          </div>

          <div className="mt-6 text-center">
            <Button onClick={() => setIsDialogOpen(false)}>
              Entendi
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NCMHelpTooltip;
