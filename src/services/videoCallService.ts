// Mock Video Call Service for ConnectSure
export interface CallState {
  isActive: boolean;
  isAudioMuted: boolean;
  isVideoOff: boolean;
  isOnHold: boolean;
  duration: number;
  remoteVideoUrl?: string;
  localVideoUrl?: string;
}

export interface Participant {
  id: string;
  name: string;
  role: string;
  isOnline: boolean;
}

class VideoCallService {
  private callState: CallState = {
    isActive: false,
    isAudioMuted: false,
    isVideoOff: false,
    isOnHold: false,
    duration: 0
  };

  private callTimer: NodeJS.Timeout | null = null;

  // Customer video call methods
  async startCall(): Promise<void> {
    this.callState.isActive = true;
    this.callState.duration = 0;
    this.startTimer();
    console.log("Video call started");
  }

  async endCall(): Promise<void> {
    this.callState.isActive = false;
    this.stopTimer();
    console.log("Video call ended");
  }

  toggleMic(): boolean {
    this.callState.isAudioMuted = !this.callState.isAudioMuted;
    console.log(`Audio ${this.callState.isAudioMuted ? 'muted' : 'unmuted'}`);
    return this.callState.isAudioMuted;
  }

  toggleCamera(): boolean {
    this.callState.isVideoOff = !this.callState.isVideoOff;
    console.log(`Video ${this.callState.isVideoOff ? 'off' : 'on'}`);
    return this.callState.isVideoOff;
  }

  flipCamera(): void {
    console.log("Camera flipped");
  }

  // eKYC methods
  async captureID(): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("ID captured");
    return "id_capture_url";
  }

  async performLivenessCheck(): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log("Liveness check completed");
    return true;
  }

  // Agent-specific methods
  toggleHold(): boolean {
    this.callState.isOnHold = !this.callState.isOnHold;
    console.log(`Call ${this.callState.isOnHold ? 'on hold' : 'resumed'}`);
    return this.callState.isOnHold;
  }

  async addParticipant(participantId: string): Promise<void> {
    console.log(`Participant ${participantId} added to call`);
  }

  async transferCall(targetId: string): Promise<void> {
    console.log(`Call transferred to ${targetId}`);
  }

  getCallState(): CallState {
    return { ...this.callState };
  }

  // Mock available participants for agent
  getAvailableParticipants(): Participant[] {
    return [
      { id: "agent_002", name: "Trần Văn Bình", role: "Tư vấn viên", isOnline: true },
      { id: "agent_003", name: "Nguyễn Thị Cúc", role: "Quản lý", isOnline: true },
      { id: "agent_004", name: "Lê Văn Dũng", role: "Chuyên viên eKYC", isOnline: false },
      { id: "dept_001", name: "Phòng Hỗ trợ Kỹ thuật", role: "Bộ phận", isOnline: true }
    ];
  }

  private startTimer(): void {
    this.callTimer = setInterval(() => {
      this.callState.duration += 1;
    }, 1000);
  }

  private stopTimer(): void {
    if (this.callTimer) {
      clearInterval(this.callTimer);
      this.callTimer = null;
    }
  }

  formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}

export const videoCallService = new VideoCallService();