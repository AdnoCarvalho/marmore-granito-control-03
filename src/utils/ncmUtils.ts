
import { MaterialType, ProcessingLevel, NCMCode } from '@/types';

// Banco de dados simplificado de informações tributárias por NCM
export const ncmTaxData = {
  [NCMCode.MARBLE_RAW]: {
    description: "Mármore bruto ou desbastado",
    icms: 17, // valores exemplo
    ipi: 0,
    pis: 1.65,
    cofins: 7.6
  },
  [NCMCode.GRANITE_RAW]: {
    description: "Granito bruto ou desbastado",
    icms: 17,
    ipi: 0,
    pis: 1.65,
    cofins: 7.6
  },
  [NCMCode.MARBLE_PROCESSED]: {
    description: "Mármore trabalhado/beneficiado",
    icms: 17,
    ipi: 5,
    pis: 1.65,
    cofins: 7.6
  },
  [NCMCode.GRANITE_PROCESSED]: {
    description: "Granito trabalhado para construção",
    icms: 17,
    ipi: 5,
    pis: 1.65,
    cofins: 7.6
  },
  [NCMCode.GRANITE_MOSAIC]: {
    description: "Outras pedras trabalhadas (mosaicos, peças)",
    icms: 17,
    ipi: 10,
    pis: 1.65,
    cofins: 7.6
  }
};

// Função para sugerir NCM com base no tipo de material e nível de beneficiamento
export function suggestNCM(materialType: MaterialType, processingLevel: ProcessingLevel): string {
  // Lógica para sugerir NCM baseado no tipo de material e processamento
  if (materialType === MaterialType.MARBLE) {
    return processingLevel === ProcessingLevel.RAW 
      ? NCMCode.MARBLE_RAW 
      : NCMCode.MARBLE_PROCESSED;
  } 
  else if (materialType === MaterialType.GRANITE || materialType === MaterialType.QUARTZITE) {
    if (processingLevel === ProcessingLevel.RAW) {
      return NCMCode.GRANITE_RAW;
    }
    else if (processingLevel === ProcessingLevel.FINISHED) {
      return NCMCode.GRANITE_MOSAIC;
    }
    else {
      return NCMCode.GRANITE_PROCESSED;
    }
  }
  
  return NCMCode.OTHER;
}

// Função para validar formato do NCM
export function validateNCMFormat(ncmCode: string): boolean {
  // Verifica se o NCM segue o padrão XXXX.XX.XX onde X são números
  const ncmPattern = /^\d{4}\.\d{2}\.\d{2}$/;
  return ncmPattern.test(ncmCode);
}

// Função para verificar se o NCM existe na base de dados oficial
export function isValidNCM(ncmCode: string): boolean {
  // Implementação simplificada - em um sistema real, verificaria contra uma API ou base de dados completa
  return Object.values(NCMCode).includes(ncmCode as NCMCode) || validateNCMFormat(ncmCode);
}

// Função para obter informações de tributos de um NCM
export function getTaxInfo(ncmCode: string) {
  // Caso o NCM esteja em nossa base, retornamos as informações
  if (ncmCode in ncmTaxData) {
    return {
      ncmCode,
      ...ncmTaxData[ncmCode as keyof typeof ncmTaxData]
    };
  }
  
  // Caso contrário, retornamos valores padrão (em um sistema real, consultaria uma API)
  return {
    ncmCode,
    description: "NCM não encontrado na base de dados",
    icms: 17, // valores padrão
    ipi: 0,
    pis: 1.65,
    cofins: 7.6
  };
}
