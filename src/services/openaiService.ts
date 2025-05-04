
import { Message } from "../types/chat";

// This would typically come from environment variables
const OPENAI_API_KEY = "YOUR_API_KEY_HERE";

export const sendMessageToOpenAI = async (messages: Message[]): Promise<string> => {
  // In a production app, this would be a real API call to OpenAI
  // For this demo, we're simulating responses
  console.log("Sending to OpenAI:", messages);
  
  const lastMessage = messages[messages.length - 1];
  
  // Simulate API call delay - random delay between 1-3 seconds for more realistic feel
  const randomDelay = Math.floor(Math.random() * 2000) + 1000;
  await new Promise(resolve => setTimeout(resolve, randomDelay));
  
  // Get the user's message in lowercase for easier matching
  const userMessage = lastMessage.content.toLowerCase();
  
  // Check message context from previous messages
  const context = messages.slice(-4).map(m => m.content.toLowerCase()).join(" ");
  
  // Detect language (simple implementation - would be more robust with a real NLP library)
  const isTurkish = detectTurkishLanguage(userMessage);
  
  // Enhanced pattern matching for various ways users might express themselves
  
  // GREETINGS - English and Turkish variants
  if ((/\b(hello|hi|hey|howdy|greetings|morning|afternoon|evening|yo|sup|hiya|what's up|whats up|good day)\b/i).test(userMessage) || 
      (/\b(merhaba|selam|selamlar|günaydın|iyi günler|iyi akşamlar|hey|naber|nbr|nasılsın|nasilsin|sa|selamın aleyküm|selamun aleyküm|s\.a)\b/i).test(userMessage)) {
    return isTurkish ? 
      "Merhaba! Ben MySmrtDoc, yapay zeka tıbbi asistanınız. Size bugün nasıl yardımcı olabilirim?" : 
      "Hello! I'm MySmrtDoc, your AI medical assistant. How can I help you today?";
  }
  
  // GRATITUDE - English and Turkish variants
  if ((/\b(thank|thanks|appreciate|grateful|thx|ty|thank you|thankyou)\b/i).test(userMessage) ||
      (/\b(teşekkür|tesekkur|teşekkürler|tesekkurler|sağol|sagol|sağolun|sagolun|eyvallah|eyv)\b/i).test(userMessage)) {
    return isTurkish ?
      "Rica ederim! Sağlık soruları veya endişeleriniz hakkında size yardımcı olmak için buradayım. Başka bir konuyu tartışmak ister misiniz?" :
      "You're welcome! I'm here to help with any health questions or concerns you have. Is there anything else you'd like to discuss?";
  }
  
  // HEADACHE - English and Turkish variants
  if ((/\b(headache|migraine|head pain|head hurts|head ache|head is hurting|painful head|head is pounding)\b/i).test(userMessage) ||
      (/\b(baş ağrısı|bas agrisi|başım ağrıyor|basim agriyor|migren|başım çatlıyor|basim catliyor|başım zonkluyor|basim zonkluyor)\b/i).test(userMessage)) {
    if (context.includes("how long") || context.includes("ne kadar") || context.includes("ne zamandır") || context.includes("ne zamandir")) {
      return isTurkish ?
        "Baş ağrınızın süresi not edilmesi önemlidir. 72 saatten uzun süren baş ağrıları veya aniden başlayan şiddetli baş ağrıları ('gök gürültüsü' baş ağrıları) acil tıbbi müdahale gerektirir. Yaşadığınız baş ağrısı türüne göre bazı potansiyel çözümler önermemi ister misiniz?" :
        "The duration of your headache is important to note. Headaches lasting more than 72 hours without relief, or severe headaches that come on suddenly ('thunderclap' headaches) require immediate medical attention. Would you like me to provide some potential remedies based on the type of headache you're experiencing?";
    }
    return isTurkish ?
      "Baş ağrısı yaşadığınızı duyduğuma üzüldüm. Ne kadar süredir bu ağrıyı hissediyorsunuz ve ağrıyı tarif edebilir misiniz? Keskin, künt, zonklayan bir ağrı mı, yoksa başka bir şey mi? Ayrıca, bulantı, ışığa karşı hassasiyet veya ateş gibi başka belirtiler yaşıyor musunuz?" :
      "I'm sorry to hear you're experiencing a headache. How long have you been having it, and can you describe the pain? Is it sharp, dull, throbbing, or something else? Also, are you experiencing any other symptoms like nausea, sensitivity to light, or fever?";
  }
  
  // STOMACH PAIN - English and Turkish variants
  if (((/\b(stomach|abdomen|belly|tummy|gut|digestive)\b/i).test(userMessage) && 
       (/\b(pain|ache|hurt|discomfort|cramp|issue|problem|upset)\b/i).test(userMessage)) ||
      ((/\b(mide|karın|karnim|midem|karnım|göbek|bağırsak|bagirsak|sindirim)\b/i).test(userMessage) && 
       (/\b(ağrı|agri|ağrısı|agrisi|ağrıyor|agriyor|sancı|sanci|rahatsızlık|rahatsizlik|kramp|sorun|problem|bozuldu)\b/i).test(userMessage))) {
    return isTurkish ?
      "Mide ağrısı yaşadığınızı anlıyorum. Bu, hazımsızlık, gıda hassasiyetleri, stres veya başka durumlar dahil çeşitli faktörlerden kaynaklanabilir. Ağrı hakkında daha fazla bilgi verebilir misiniz? Örneğin, keskin mi yoksa künt mü? Sürekli mi yoksa aralıklı mı? Yemek yeme veya diğer aktivitelerle ilgili herhangi bir model fark ettiniz mi?" :
      "I understand you're experiencing stomach pain. This could be caused by various factors including indigestion, food sensitivities, stress, or other conditions. Can you tell me more about the pain? For example, is it sharp or dull? Constant or intermittent? Have you noticed any patterns related to eating or other activities?";
  }
  
  // COLD/FLU - English and Turkish variants
  if ((/\b(cold|flu|fever|cough|congestion|runny nose|sore throat|sneezing|stuffy|chills|body aches)\b/i).test(userMessage) ||
      (/\b(soğuk algınlığı|soguk alginligi|grip|ateş|ates|öksürük|oksuruk|burun akıntısı|burun akintisi|burun tıkanıklığı|burun tikanikligi|boğaz ağrısı|bogaz agrisi|hapşırma|hapsirma|üşüme|usume|vücut ağrısı|vucut agrisi)\b/i).test(userMessage)) {
    return isTurkish ?
      "Soğuk algınlığı veya grip belirtileri yaşıyor olabilirsiniz. Yaygın çözümler arasında dinlenmek, bol sıvı tüketmek ve belirtileri yönetmek için reçetesiz ilaçlar almak bulunur. Yüksek ateşiniz (38.3°C/101°F'nin üzerinde) devam ediyorsa veya belirtiler 7-10 gün sonra kötüleşirse, bir sağlık uzmanına başvurmanızı öneririm. Herhangi bir belirtiyi yönetmek için özel öneriler ister misiniz?" :
      "It sounds like you might be experiencing symptoms of a cold or flu. Common remedies include rest, staying hydrated, and over-the-counter medications to manage symptoms. If you have a high fever (above 101°F or 38.3°C) that persists, or if symptoms worsen after 7-10 days, I'd recommend consulting with a healthcare provider. Would you like specific recommendations for managing any particular symptoms?";
  }
  
  // DIET - English and Turkish variants
  if ((/\b(diet|nutrition|eat|food|weight|healthy eating|meal|calories|macro|nutrients|protein|carb|fat|vitamins|minerals)\b/i).test(userMessage) ||
      (/\b(diyet|beslenme|yemek|yiyecek|gıda|gida|kilo|sağlıklı beslenme|saglikli beslenme|öğün|ogun|kalori|makro|besin|protein|karbonhidrat|yağ|yag|vitaminler|mineraller)\b/i).test(userMessage)) {
    return isTurkish ?
      "Dengeli bir diyet genel sağlık için esastır. Meyve, sebze, tam tahıllar, yağsız proteinler ve sağlıklı yağlar içeren Akdeniz diyeti, çok sayıda sağlık faydası ile ilişkilendirilmiştir. Belirli bir sağlık hedefi veya durum için özel diyet önerileri ister misiniz?" :
      "A balanced diet is essential for overall health. The Mediterranean diet, which emphasizes fruits, vegetables, whole grains, lean proteins, and healthy fats, has been associated with numerous health benefits. Would you like some specific dietary recommendations for a particular health goal or condition?";
  }
  
  // EXERCISE - English and Turkish variants
  if ((/\b(exercise|workout|fitness|physical activity|training|gym|cardio|strength|running|walking|cycling|swimming|sports|active)\b/i).test(userMessage) ||
      (/\b(egzersiz|antrenman|spor|fiziksel aktivite|eğitim|egitim|spor salonu|kardiyo|kuvvet|koşu|kosu|yürüyüş|yuruyus|bisiklet|yüzme|yuzme|aktif)\b/i).test(userMessage)) {
    return isTurkish ?
      "Düzenli fiziksel aktivite hem fiziksel hem de zihinsel sağlık için önemlidir. Genel tavsiye, haftada 150 dakika orta yoğunlukta aerobik aktivite veya 75 dakika yoğun aktivite ve haftada iki kez kas güçlendirme aktiviteleridir. Şu anda hangi tür egzersizi yapıyorsunuz veya ilgileniyorsunuz?" :
      "Regular physical activity is important for both physical and mental health. The general recommendation is 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity per week, plus muscle-strengthening activities twice weekly. What type of exercise are you currently doing or interested in?";
  }
  
  // SLEEP - English and Turkish variants
  if ((/\b(sleep|insomnia|tired|fatigue|can't sleep|trouble sleeping|restless|nighttime|bedtime|drowsy|exhausted|rest)\b/i).test(userMessage) ||
      (/\b(uyku|uykusuzluk|yorgun|yorgunluk|uyuyamıyorum|uyuyamiyorum|uyku sorunu|huzursuz|gece|yatma zamanı|uykulu|bitkin|dinlenme)\b/i).test(userMessage)) {
    return isTurkish ?
      "İyi uyku hijyeni sağlık için çok önemlidir. Çoğu yetişkin geceleri 7-9 saat kaliteli uykuya ihtiyaç duyar. Uyumakta zorluk yaşıyorsanız, düzenli bir uyku programı oluşturmayı, huzurlu bir ortam yaratmayı, yatmadan önce ekran süresini sınırlamayı ve uyumadan önce kafein ve büyük öğünlerden kaçınmayı düşünün. Uyku endişeleriniz hakkında daha spesifik tavsiyeler ister misiniz?" :
      "Good sleep hygiene is crucial for health. Most adults need 7-9 hours of quality sleep per night. If you're having trouble sleeping, consider establishing a regular sleep schedule, creating a restful environment, limiting screen time before bed, and avoiding caffeine and large meals before sleeping. Would you like more specific advice about your sleep concerns?";
  }
  
  // STRESS/ANXIETY - English and Turkish variants
  if ((/\b(stress|anxiety|worried|nervous|overwhelmed|mental health|panic|depression|mood|emotions|tension|pressure)\b/i).test(userMessage) ||
      (/\b(stres|anksiyete|kaygı|kaygi|endişe|endise|sinirli|bunalmış|bunalmis|ruh sağlığı|ruh sagligi|panik|depresyon|duygu durum|duygular|gerginlik|baskı|baski)\b/i).test(userMessage)) {
    return isTurkish ?
      "Stresli veya kaygılı hissettiğinizi duyduğuma üzüldüm. Stresi yönetmek hem zihinsel hem de fiziksel sağlık için önemlidir. Derin nefes alma, bilinçli farkındalık meditasyonu, düzenli egzersiz ve yeterli uyku gibi teknikler yardımcı olabilir. Belirli stres yönetim stratejileri hakkında daha fazla bilgi edinmek ister misiniz?" :
      "I'm sorry to hear you're feeling stressed or anxious. Managing stress is important for both mental and physical health. Techniques like deep breathing, mindfulness meditation, regular exercise, and adequate sleep can help. Would you like to know more about specific stress management strategies?";
  }
  
  // BLOOD PRESSURE - English and Turkish variants
  if ((/\b(blood pressure|hypertension|heart|cardiovascular|pulse|heartbeat|circulation|cardiac|chest pain)\b/i).test(userMessage) ||
      (/\b(tansiyon|kan basıncı|kan basinci|hipertansiyon|kalp|kardiyovasküler|kardiyovaskuler|nabız|nabiz|kalp atışı|kalp atisi|dolaşım|dolasim|kardiyak|göğüs ağrısı|gogus agrisi)\b/i).test(userMessage)) {
    return isTurkish ?
      "Sağlıklı bir kan basıncını korumak kalp sağlığı için önemlidir. Normal kan basıncı genellikle 120/80 mmHg civarındadır. Yardımcı olabilecek yaşam tarzı faktörleri arasında düzenli egzersiz, sodyum açısından düşük dengeli bir diyet, alkol sınırlaması, sigara içmemek ve stresi yönetmek yer alır. Şu anda kan basıncınızı takip ediyor musunuz?" :
      "Maintaining healthy blood pressure is important for heart health. Normal blood pressure is typically around 120/80 mmHg. Lifestyle factors that can help include regular exercise, a balanced diet low in sodium, limiting alcohol, not smoking, and managing stress. Are you currently monitoring your blood pressure?";
  }
  
  // DIABETES - English and Turkish variants
  if ((/\b(diabetes|blood sugar|glucose|insulin|type 1|type 2|diabetic|prediabetes|a1c|glycemic)\b/i).test(userMessage) ||
      (/\b(diyabet|kan şekeri|kan sekeri|glikoz|glukoz|insülin|insulin|tip 1|tip 2|diyabetik|prediyabet|a1c|glisemik)\b/i).test(userMessage)) {
    return isTurkish ?
      "Kan şekeri seviyelerini yönetmek, diyabeti olan veya risk altında olanlar için çok önemlidir. Bu genellikle dengeli bir diyet, düzenli egzersiz, reçete edilmişse ilaç ve düzenli izleme içerir. Diyabet yönetiminin hangi özel yönlerini tartışmak istersiniz?" :
      "Managing blood sugar levels is crucial for those with or at risk for diabetes. This typically involves a balanced diet, regular exercise, medication if prescribed, and regular monitoring. What specific aspects of diabetes management would you like to discuss?";
  }
  
  // VITAMINS - English and Turkish variants
  if ((/\b(vitamin|supplement|mineral|nutrient|deficiency|multivitamin|omega|zinc|iron|calcium|magnesium)\b/i).test(userMessage) ||
      (/\b(vitamin|takviye|ek|mineral|besin|eksiklik|multivitamin|omega|çinko|cinko|demir|kalsiyum|magnezyum)\b/i).test(userMessage)) {
    return isTurkish ?
      "Dengeli bir diyet çoğu besin maddesini sağlamalıysa da, bazı kişiler takviyelerden fayda görebilir. Bununla birlikte, takviyelerin sağlıklı bir diyetin yerini almaması, tamamlaması gerektiğini belirtmek önemlidir. Belirli bir takviye mi düşünüyorsunuz, yoksa hangi vitaminlerin sizin özel durumunuza fayda sağlayabileceği hakkında bilgi mi istersiniz?" :
      "While a balanced diet should provide most nutrients, some people benefit from supplements. However, it's important to note that supplements should complement, not replace, a healthy diet. Are you considering a specific supplement, or would you like information about which vitamins might benefit your particular situation?";
  }
  
  // ALLERGIES - English and Turkish variants
  if ((/\b(allergy|allergic|reaction|allergen|histamine|anaphylaxis|hives|rash|sensitivity|intolerance|swelling)\b/i).test(userMessage) ||
      (/\b(alerji|alerjik|reaksiyon|alerjen|histamin|anafilaksi|kurdeşen|kurdeşeni|kurdeşenler|kurdeseni|kurdesenler|döküntü|dokuntuler|hassasiyet|intolerans|şişlik|sislik)\b/i).test(userMessage)) {
    return isTurkish ?
      "Alerjiler hafiften şiddetliye kadar değişebilir ve gıdalar, ilaçlar, böcek ısırıkları veya çevresel faktörler dahil çeşitli maddeler tarafından tetiklenebilir. Yaşadığınız veya endişelendiğiniz alerjik reaksiyonlar hakkında daha fazla ayrıntı paylaşabilir misiniz?" :
      "Allergies can range from mild to severe and can be triggered by various substances including foods, medications, insect bites, or environmental factors. Can you share more details about the allergic reactions you're experiencing or concerned about?";
  }
  
  // SHORT QUERIES - English and Turkish variants
  if (userMessage.split(" ").length < 3) {
    return isTurkish ?
      "Size yardımcı olmaktan mutluluk duyarım. Size en alakalı bilgileri verebilmem için sorunuz veya endişeniz hakkında daha fazla ayrıntı sağlayabilir misiniz?" :
      "I'd be happy to help you. Could you provide more details about your question or concern so I can give you the most relevant information?";
  }
  
  // DEFAULT MEDICAL QUESTIONS
  if (userMessage.length > 10) {
    return isTurkish ?
      "Bu bilgileri paylaştığınız için teşekkür ederim. Size en doğru rehberliği sağlamak için belirtileriniz, ne kadar süredir yaşadığınız ve diğer ilgili sağlık detayları hakkında biraz daha bilgi verebilir misiniz? Bu, durumunuzu daha iyi anlamama ve uygun rehberlik sağlamama yardımcı olacaktır." :
      "Thank you for sharing that information. To provide you with the most accurate guidance, could you tell me a bit more about your symptoms, how long you've been experiencing them, and any other relevant health details? This will help me better understand your situation.";
  }
  
  // FALLBACK RESPONSE
  return isTurkish ?
    "Endişenizi anlıyorum. Size en doğru bilgileri sağlamak için, sorunuz hakkında daha fazla ayrıntı paylaşabilir misiniz? Bu, durumunuzu daha iyi anlamama ve uygun rehberlik sağlamama yardımcı olacaktır." :
    "I understand your concern. To provide you with the most accurate information, could you share more details about your question? This will help me better understand your situation and provide appropriate guidance.";
};

// Simple language detection function
function detectTurkishLanguage(text: string): boolean {
  // Turkish specific characters
  const turkishChars = ['ç', 'ğ', 'ı', 'ö', 'ş', 'ü', 'Ç', 'Ğ', 'İ', 'Ö', 'Ş', 'Ü'];
  
  // Turkish common words
  const turkishWords = ['ve', 'bir', 'bu', 'için', 'merhaba', 'nasıl', 'evet', 'hayır', 'selam', 'teşekkür'];
  
  // Check for Turkish characters
  for (const char of turkishChars) {
    if (text.includes(char)) {
      return true;
    }
  }
  
  // Check for Turkish words
  for (const word of turkishWords) {
    if (text.toLowerCase().includes(word)) {
      return true;
    }
  }
  
  // Count Turkish words vs English words
  let turkishWordCount = 0;
  let englishWordCount = 0;
  
  const words = text.toLowerCase().split(/\s+/);
  
  for (const word of words) {
    if (turkishWords.includes(word)) {
      turkishWordCount++;
    } else if (/^[a-z]+$/.test(word)) {
      englishWordCount++;
    }
  }
  
  return turkishWordCount > englishWordCount;
}
